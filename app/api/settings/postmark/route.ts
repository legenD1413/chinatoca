import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 检查数据库健康状态
async function checkDatabaseHealth() {
  try {
    // 简单测试数据库连接
    await prisma.$queryRaw`SELECT 1+1 as result`;
    return { healthy: true };
  } catch (error) {
    console.error("数据库健康检查失败:", error);
    return { 
      healthy: false, 
      error: String(error)
    };
  }
}

// 尝试创建PostmarkSetting表（如果不存在）
async function ensurePostmarkTable() {
  try {
    // 检查表是否存在
    const tables = await prisma.$queryRaw`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name='PostmarkSetting'
    `;
    
    const tableExists = Array.isArray(tables) && tables.length > 0;
    
    if (!tableExists) {
      console.log('PostmarkSetting表不存在，尝试创建...');
      
      try {
        // 使用更详细的错误处理和日志记录
        // 直接执行SQL创建表
        await prisma.$executeRaw`
          CREATE TABLE IF NOT EXISTS "PostmarkSetting" (
            "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            "apiToken" TEXT NOT NULL,
            "fromEmail" TEXT NOT NULL,
            "replyToEmail" TEXT,
            "messageStream" TEXT NOT NULL DEFAULT 'outbound',
            "enabled" BOOLEAN NOT NULL DEFAULT true,
            "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" DATETIME NOT NULL
          );
        `;
        
        // 创建后再次检查表是否存在
        const checkAgain = await prisma.$queryRaw`
          SELECT name FROM sqlite_master 
          WHERE type='table' AND name='PostmarkSetting'
        `;
        
        const tableCreated = Array.isArray(checkAgain) && checkAgain.length > 0;
        
        if (tableCreated) {
          console.log('PostmarkSetting表创建成功');
          return { success: true, created: true };
        } else {
          console.error('尝试创建PostmarkSetting表后，表仍不存在');
          return { 
            success: false, 
            error: "表创建失败，创建后无法验证表是否存在" 
          };
        }
      } catch (createError) {
        console.error("创建PostmarkSetting表出错:", createError);
        
        // 尝试备用方法 - 使用Prisma模型操作创建
        try {
          console.log('尝试使用备用方法创建PostmarkSetting表...');
          // 使用Prisma的createMany强制创建表
          await prisma.$transaction(async (tx) => {
            // 先尝试创建一个记录来强制表的创建
            await tx.postmarkSetting.create({
              data: {
                apiToken: "0addebb5-6e41-44b6-af05-7ec14d9e2852",
                fromEmail: "no-reply@chinato.ca",
                messageStream: "outbound",
                enabled: true,
                updatedAt: new Date()
              }
            });
            
            // 删除刚创建的记录，保持表为空
            const setting = await tx.postmarkSetting.findFirst();
            if (setting) {
              await tx.postmarkSetting.delete({
                where: {
                  id: setting.id
                }
              });
            }
          });
          
          console.log('备用方法创建PostmarkSetting表成功');
          return { success: true, created: true, method: 'backup' };
        } catch (backupError) {
          console.error("备用方法创建失败:", backupError);
          return { 
            success: false, 
            error: String(createError),
            backupError: String(backupError)
          };
        }
      }
    }
    
    console.log('PostmarkSetting表已存在');
    return { success: true, created: false };
  } catch (error) {
    console.error("确保PostmarkSetting表存在失败:", error);
    return { success: false, error: String(error) };
  }
}

// 获取Postmark设置
export async function GET() {
  try {
    console.log('GET /api/settings/postmark - 获取Postmark设置');
    
    // 检查数据库健康状态
    const healthCheck = await checkDatabaseHealth();
    if (!healthCheck.healthy) {
      return NextResponse.json({ 
        error: "数据库连接失败", 
        details: healthCheck.error 
      }, { status: 500 });
    }
    
    // 确保表存在
    const tableCheck = await ensurePostmarkTable();
    if (!tableCheck.success) {
      return NextResponse.json({ 
        error: "无法确保PostmarkSetting表存在", 
        details: tableCheck.error 
      }, { status: 500 });
    }
    
    const postmarkSetting = await prisma.postmarkSetting.findFirst();
    console.log('数据库查询结果:', postmarkSetting ? '找到设置' : '未找到设置');
    
    // 如果没有设置，返回默认值
    if (!postmarkSetting) {
      console.log('返回默认设置值');
      return NextResponse.json({
        apiToken: "",
        fromEmail: "",
        replyToEmail: "",
        messageStream: "outbound",
        enabled: true
      });
    }
    
    // 不将完整的API令牌返回给前端，仅返回部分遮蔽版本
    const maskedApiToken = postmarkSetting.apiToken 
      ? maskApiToken(postmarkSetting.apiToken) 
      : "";
    
    console.log('返回遮蔽后的设置');
    return NextResponse.json({
      ...postmarkSetting,
      apiToken: maskedApiToken
    });
  } catch (error) {
    console.error("获取Postmark设置失败:", error);
    return NextResponse.json({ error: "获取Postmark设置失败", details: String(error) }, { status: 500 });
  }
}

// 创建或更新Postmark设置
export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/settings/postmark - 创建或更新Postmark设置');
    
    // 检查数据库健康状态
    const healthCheck = await checkDatabaseHealth();
    if (!healthCheck.healthy) {
      return NextResponse.json({ 
        error: "数据库连接失败", 
        details: healthCheck.error 
      }, { status: 500 });
    }
    
    // 确保表存在
    const tableCheck = await ensurePostmarkTable();
    if (!tableCheck.success) {
      return NextResponse.json({ 
        error: "无法确保PostmarkSetting表存在", 
        details: tableCheck.error 
      }, { status: 500 });
    }
    
    const data = await request.json();
    console.log('接收到的数据:', {
      ...data,
      apiToken: data.apiToken ? `${data.apiToken.substring(0, 4)}...` : '空'
    });
    
    // 验证必填字段
    if (!data.apiToken || !data.fromEmail) {
      console.log('验证失败: 缺少必填字段');
      return NextResponse.json(
        { error: "API令牌和发件人邮箱为必填字段" }, 
        { status: 400 }
      );
    }
    
    // 检查是否已存在设置
    const existingSetting = await prisma.postmarkSetting.findFirst();
    console.log('现有设置检查:', existingSetting ? `找到ID=${existingSetting.id}` : '未找到');
    
    let postmarkSetting;
    
    try {
      // 准备当前时间
      const now = new Date();
      
      if (existingSetting) {
        // 如果设置存在，则更新现有设置
        console.log(`更新ID=${existingSetting.id}的设置`);
        postmarkSetting = await prisma.postmarkSetting.update({
          where: {
            id: existingSetting.id
          },
          data: {
            apiToken: data.apiToken,
            fromEmail: data.fromEmail,
            replyToEmail: data.replyToEmail || null,
            messageStream: data.messageStream || "outbound",
            enabled: data.enabled !== undefined ? data.enabled : true,
            updatedAt: now
          }
        });
      } else {
        // 如果设置不存在，则创建新设置
        console.log('创建新设置');
        postmarkSetting = await prisma.postmarkSetting.create({
          data: {
            apiToken: data.apiToken,
            fromEmail: data.fromEmail,
            replyToEmail: data.replyToEmail || null,
            messageStream: data.messageStream || "outbound",
            enabled: data.enabled !== undefined ? data.enabled : true,
            updatedAt: now
          }
        });
      }
      
      console.log('操作成功完成:', postmarkSetting.id);
      
      // 不将完整的API令牌返回给前端，仅返回部分遮蔽版本
      const maskedApiToken = maskApiToken(postmarkSetting.apiToken);
      
      return NextResponse.json({
        ...postmarkSetting,
        apiToken: maskedApiToken
      });
    } catch (dbError) {
      console.error('数据库操作失败:', dbError);
      
      // 尝试通过直接SQL语句写入来解决问题
      try {
        console.log('尝试通过SQL语句直接写入...');
        const now = new Date().toISOString();
        
        if (existingSetting) {
          await prisma.$executeRaw`
            UPDATE "PostmarkSetting"
            SET 
              "apiToken" = ${data.apiToken},
              "fromEmail" = ${data.fromEmail},
              "replyToEmail" = ${data.replyToEmail || null},
              "messageStream" = ${data.messageStream || "outbound"},
              "enabled" = ${data.enabled !== undefined ? data.enabled : true},
              "updatedAt" = ${now}
            WHERE "id" = ${existingSetting.id}
          `;
        } else {
          await prisma.$executeRaw`
            INSERT INTO "PostmarkSetting" 
            ("apiToken", "fromEmail", "replyToEmail", "messageStream", "enabled", "createdAt", "updatedAt")
            VALUES 
            (
              ${data.apiToken},
              ${data.fromEmail},
              ${data.replyToEmail || null},
              ${data.messageStream || "outbound"},
              ${data.enabled !== undefined ? data.enabled : true},
              ${now},
              ${now}
            )
          `;
        }
        
        // 再次查询来获取结果
        const updatedSetting = await prisma.postmarkSetting.findFirst();
        if (updatedSetting) {
          console.log('SQL直接写入成功');
          const maskedApiToken = maskApiToken(updatedSetting.apiToken);
          return NextResponse.json({
            ...updatedSetting,
            apiToken: maskedApiToken
          });
        } else {
          throw new Error("写入后无法检索设置");
        }
      } catch (sqlError) {
        console.error('SQL直接写入失败:', sqlError);
        return NextResponse.json({
          error: "数据库操作失败",
          details: String(dbError),
          sqlError: String(sqlError)
        }, { status: 500 });
      }
    }
  } catch (error) {
    console.error("保存Postmark设置失败:", error);
    return NextResponse.json({
      error: "保存Postmark设置失败",
      details: String(error)
    }, { status: 500 });
  }
}

// 测试Postmark连接
export async function PUT(request: NextRequest) {
  try {
    console.log('PUT /api/settings/postmark - 测试Postmark连接');
    
    // 检查数据库健康状态
    const healthCheck = await checkDatabaseHealth();
    if (!healthCheck.healthy) {
      return NextResponse.json({ 
        success: false,
        error: "数据库连接失败", 
        details: healthCheck.error 
      }, { status: 500 });
    }
    
    const data = await request.json();
    console.log('接收到的测试数据:', {
      ...data,
      apiToken: data.apiToken ? `${data.apiToken.substring(0, 4)}...` : '空'
    });
    
    // 验证必填字段
    if (!data.apiToken || !data.fromEmail) {
      console.log('验证失败: 缺少必填字段');
      return NextResponse.json(
        { 
          success: false,
          error: "API令牌和发件人邮箱为必填字段" 
        }, 
        { status: 400 }
      );
    }
    
    // 测试连接逻辑
    try {
      console.log('尝试发送测试邮件...');
      const postmark = require('postmark');
      const client = new postmark.ServerClient(data.apiToken);
      
      // 发送测试邮件给自己
      const result = await client.sendEmail({
        From: data.fromEmail,
        To: data.fromEmail,
        Subject: "Postmark连接测试 - ChinaTo.ca",
        TextBody: `这是一封测试邮件，用于验证Postmark API连接是否正常。\n\n时间: ${new Date().toLocaleString('zh-CN')}`,
        MessageStream: data.messageStream || "outbound"
      });
      
      console.log('测试邮件发送成功:', result.MessageID);
      
      // 如果测试成功，尝试保存设置
      try {
        // 检查是否需要保存设置
        const existingSetting = await prisma.postmarkSetting.findFirst();
        if (!existingSetting) {
          // 如果没有设置，创建一个
          console.log('测试成功，保存设置...');
          await prisma.postmarkSetting.create({
            data: {
              apiToken: data.apiToken,
              fromEmail: data.fromEmail,
              replyToEmail: data.replyToEmail || null,
              messageStream: data.messageStream || "outbound",
              enabled: true,
              updatedAt: new Date()
            }
          });
        }
      } catch (saveError) {
        // 忽略保存错误，不影响测试结果
        console.warn('测试后保存设置失败:', saveError);
      }
      
      return NextResponse.json({ 
        success: true, 
        message: "Postmark连接测试成功",
        details: { messageId: result.MessageID }
      });
    } catch (testError: any) {
      console.error('测试邮件发送失败:', testError);
      return NextResponse.json({ 
        success: false,
        error: "Postmark连接测试失败",
        details: testError.message || "未知错误"
      }, { status: 400 });
    }
  } catch (error) {
    console.error("测试Postmark连接失败:", error);
    return NextResponse.json({ 
      success: false,
      error: "测试Postmark连接失败", 
      details: String(error) 
    }, { status: 500 });
  }
}

// 遮蔽API令牌，只显示前4位和后4位
function maskApiToken(token: string): string {
  if (token.length <= 8) {
    return token;
  }
  const firstFour = token.substring(0, 4);
  const lastFour = token.substring(token.length - 4);
  return `${firstFour}${'*'.repeat(token.length - 8)}${lastFour}`;
} 