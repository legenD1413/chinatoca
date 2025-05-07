import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from 'fs';
import path from 'path';

// 创建PostmarkSetting表的API
export async function POST() {
  console.log('POST /api/settings/postmark/create-table - 创建PostmarkSetting表');
  
  try {
    // 检查表是否已存在
    const tables = await prisma.$queryRaw`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name='PostmarkSetting'
    `;
    
    const tableExists = Array.isArray(tables) && tables.length > 0;
    
    if (tableExists) {
      console.log('表已存在，无需创建');
      return NextResponse.json({ 
        success: true, 
        message: "表已存在，无需创建"
      });
    }
    
    console.log('表不存在，开始创建...');
    
    // 方法1: 使用原始SQL创建表
    let sqlError = null;
    try {
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
      
      console.log('SQL创建表成功');
    } catch (error) {
      sqlError = error;
      console.error('SQL创建表失败:', error);
    }
    
    // 验证表是否创建成功
    const checkAfterCreate = await prisma.$queryRaw`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name='PostmarkSetting'
    `;
    
    const createdSuccessfully = Array.isArray(checkAfterCreate) && checkAfterCreate.length > 0;
    
    if (createdSuccessfully) {
      console.log('验证成功，表已创建');
    } else {
      console.log('验证失败，表未创建，尝试方法2...');
      
      // 方法2: 如果SQL创建失败，尝试通过Prisma Schema Push创建
      // 使用子进程运行prisma db push
      try {
        const { exec } = require('child_process');
        
        // 创建Promise版本的exec
        const execPromise = (command: string): Promise<string> => {
          return new Promise((resolve, reject) => {
            exec(command, (error: Error | null, stdout: string, stderr: string) => {
              if (error) {
                console.error(`执行命令错误: ${error.message}`);
                return reject(error);
              }
              if (stderr) {
                console.error(`命令stderr: ${stderr}`);
              }
              resolve(stdout);
            });
          });
        };
        
        // 尝试使用Prisma CLI直接推送架构
        console.log('尝试使用Prisma CLI推送架构...');
        try {
          await execPromise('npx prisma db push --skip-generate');
          console.log('Prisma CLI推送架构成功');
        } catch (pushError) {
          console.error('Prisma CLI推送架构失败:', pushError);
          
          // 检查是否是权限错误
          const errorMsg = String(pushError);
          if (errorMsg.includes('Access is denied') || 
              errorMsg.includes('permission denied') || 
              errorMsg.includes('EPERM')) {
            return NextResponse.json({ 
              success: false, 
              error: "权限不足，无法创建表。请尝试以管理员身份运行应用或使用手动SQL方法。",
              details: errorMsg
            }, { status: 500 });
          }
        }
        
        // 再次检查表是否已创建
        const recheckAfterPush = await prisma.$queryRaw`
          SELECT name FROM sqlite_master 
          WHERE type='table' AND name='PostmarkSetting'
        `;
        
        const pushedSuccessfully = Array.isArray(recheckAfterPush) && recheckAfterPush.length > 0;
        
        if (!pushedSuccessfully) {
          return NextResponse.json({ 
            success: false, 
            error: "无法创建表。SQL方法和Prisma CLI方法均失败。",
            sqlError: sqlError ? String(sqlError) : undefined
          }, { status: 500 });
        }
      } catch (execError) {
        console.error('执行Prisma CLI失败:', execError);
        return NextResponse.json({ 
          success: false, 
          error: "无法执行Prisma CLI。请检查Node.js环境配置。",
          details: String(execError)
        }, { status: 500 });
      }
    }
    
    // 如果方法1或方法2成功，添加初始记录
    try {
      await prisma.postmarkSetting.create({
        data: {
          apiToken: "0addebb5-6e41-44b6-af05-7ec14d9e2852",
          fromEmail: "no-reply@chinato.ca",
          messageStream: "outbound",
          enabled: true,
          updatedAt: new Date()
        }
      });
      console.log('初始记录创建成功');
      
      return NextResponse.json({ 
        success: true, 
        message: "表创建成功并已添加初始记录",
        method: sqlError ? "prisma db push" : "sql"
      });
    } catch (recordError) {
      console.error('初始记录创建失败:', recordError);
      
      // 即使未能创建记录，表已创建成功，所以返回成功但带警告
      return NextResponse.json({ 
        success: true, 
        message: "表创建成功，但初始记录创建失败，请手动创建设置",
        recordError: String(recordError),
        method: sqlError ? "prisma db push" : "sql"
      });
    }
  } catch (error) {
    console.error('创建PostmarkSetting表失败:', error);
    
    // 包含详细的错误信息和修复建议
    const errorMessage = String(error);
    let suggestion = "请尝试手动关闭应用程序，以管理员身份运行命令提示符，然后执行 'npx prisma db push'";
    
    if (errorMessage.includes('database is locked')) {
      suggestion = "数据库被锁定。请关闭所有使用该数据库的应用程序后再尝试。";
    } else if (errorMessage.includes('Access is denied') || 
               errorMessage.includes('permission denied') || 
               errorMessage.includes('EPERM')) {
      suggestion = "权限不足。请以管理员身份运行应用程序或命令提示符。";
    }
    
    return NextResponse.json({ 
      success: false, 
      error: String(error),
      message: suggestion
    }, { status: 500 });
  }
} 