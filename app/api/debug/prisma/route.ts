import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";

// 创建一个临时的Prisma客户端实例，用于调试
let debugPrisma: PrismaClient | undefined;

// 处理BigInt序列化问题的函数
function sanitizeDataForJSON(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  if (typeof obj === 'bigint') {
    return obj.toString(); // 将BigInt转换为字符串
  }
  
  if (Array.isArray(obj)) {
    return obj.map(sanitizeDataForJSON);
  }
  
  if (typeof obj === 'object') {
    const result: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = sanitizeDataForJSON(obj[key]);
      }
    }
    return result;
  }
  
  return obj;
}

export async function GET() {
  try {
    console.log('GET /api/debug/prisma - 检查Prisma状态');
    
    // 尝试初始化一个新的Prisma客户端
    if (!debugPrisma) {
      console.log('初始化新的Prisma客户端...');
      try {
        debugPrisma = new PrismaClient();
        console.log('Prisma客户端初始化成功');
      } catch (initError) {
        console.error('Prisma客户端初始化失败:', initError);
        return NextResponse.json({
          status: 'error',
          error: `Prisma客户端初始化失败: ${String(initError)}`,
          prismaConnected: false,
          databaseModels: [],
          postmarkSetting: {
            tableExists: false,
            columns: [],
            data: []
          }
        }, { status: 500 });
      }
    }
    
    // 运行一个简单的查询来测试连接
    console.log('测试数据库连接...');
    let models = [];
    try {
      models = await debugPrisma.$queryRaw<{name: string}[]>`
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_prisma_%'
      `;
      console.log('查询数据库表成功');
    } catch (queryError) {
      console.error('查询数据库表失败:', queryError);
      return NextResponse.json({
        status: 'error',
        error: `查询数据库表失败: ${String(queryError)}`,
        prismaConnected: true, // 已连接但查询失败
        databaseModels: [],
        postmarkSetting: {
          tableExists: false,
          columns: [],
          data: []
        }
      }, { status: 500 });
    }
    
    // 处理可能的BigInt数据
    const sanitizedModels = sanitizeDataForJSON(models);
    console.log('数据库连接成功, 模型:', sanitizedModels);
    
    // 尝试检索PostmarkSetting表信息
    let postmarkTable = [];
    try {
      postmarkTable = await debugPrisma.$queryRaw<{name: string}[]>`
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name='PostmarkSetting'
      `;
      console.log('查询PostmarkSetting表成功');
    } catch (tableError) {
      console.error('查询PostmarkSetting表失败:', tableError);
      return NextResponse.json({
        status: 'error',
        error: `查询PostmarkSetting表失败: ${String(tableError)}`,
        prismaConnected: true,
        databaseModels: sanitizedModels,
        postmarkSetting: {
          tableExists: false,
          columns: [],
          data: []
        }
      }, { status: 500 });
    }
    
    const hasPostmarkTable = Array.isArray(postmarkTable) && postmarkTable.length > 0;
    console.log('PostmarkSetting表存在:', hasPostmarkTable);
    
    // 如果表存在，检索表结构
    let columns: any[] = [];
    if (hasPostmarkTable) {
      try {
        const rawColumns = await debugPrisma.$queryRaw<any[]>`PRAGMA table_info(PostmarkSetting)`;
        columns = sanitizeDataForJSON(rawColumns);
        console.log('获取PostmarkSetting表结构成功');
      } catch (columnsError) {
        console.error('获取PostmarkSetting表结构失败:', columnsError);
        // 继续执行，不中断流程
      }
    }
    
    // 测试表的数据
    let data: any[] = [];
    if (hasPostmarkTable) {
      try {
        const rawData = await debugPrisma.postmarkSetting.findMany({
          select: {
            id: true,
            fromEmail: true,
            messageStream: true,
            enabled: true,
            createdAt: true,
            updatedAt: true
          }
        });
        data = sanitizeDataForJSON(rawData);
        console.log(`获取到${data.length}条PostmarkSetting记录`);
      } catch (queryError) {
        console.error('查询PostmarkSetting失败:', queryError);
        // 不中断流程，表已存在但查询失败
      }
    }
    
    // 所有查询完成后构建响应
    const response = {
      status: 'ok',
      prismaConnected: true,
      databaseModels: sanitizedModels,
      postmarkSetting: {
        tableExists: hasPostmarkTable,
        columns: columns,
        data: data
      }
    };
    
    // 确保响应对象中没有BigInt
    const sanitizedResponse = sanitizeDataForJSON(response);
    
    return NextResponse.json(sanitizedResponse);
  } catch (error) {
    console.error('Prisma调试失败:', error);
    const errorResponse = {
      status: 'error',
      error: String(error),
      stack: error instanceof Error ? error.stack : undefined,
      prismaConnected: debugPrisma !== undefined,
      databaseModels: [],
      postmarkSetting: {
        tableExists: false,
        columns: [],
        data: []
      }
    };
    
    // 确保错误响应中没有BigInt
    const sanitizedErrorResponse = sanitizeDataForJSON(errorResponse);
    
    return NextResponse.json(sanitizedErrorResponse, { status: 500 });
  }
}

// 释放Prisma客户端资源
export async function DELETE() {
  try {
    if (debugPrisma) {
      await debugPrisma.$disconnect();
      debugPrisma = undefined;
      console.log('Prisma客户端已断开连接');
    }
    
    return NextResponse.json({ 
      status: 'ok', 
      message: 'Prisma客户端已断开连接' 
    });
  } catch (error) {
    console.error('断开Prisma客户端失败:', error);
    return NextResponse.json({ 
      status: 'error', 
      error: String(error),
      message: '断开连接失败' 
    }, { status: 500 });
  }
} 