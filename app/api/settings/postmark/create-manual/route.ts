import { NextResponse } from "next/server";
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import util from 'util';

// 将exec转换为Promise
const execPromise = util.promisify(exec);

// 创建PostmarkSetting表的API（使用直接的SQLite命令）
export async function POST() {
  console.log('POST /api/settings/postmark/create-manual - 使用SQLite命令创建PostmarkSetting表');
  
  try {
    // 获取工作目录
    const cwd = process.cwd();
    const dbPath = path.join(cwd, 'prisma', 'dev.db');
    
    // 检查数据库文件是否存在
    if (!fs.existsSync(dbPath)) {
      return NextResponse.json({ 
        success: false, 
        error: `数据库文件不存在: ${dbPath}`
      }, { status: 404 });
    }
    
    // 检查是否安装了sqlite3
    try {
      await execPromise('sqlite3 --version');
    } catch (error) {
      return NextResponse.json({ 
        success: false, 
        error: 'sqlite3命令行工具未安装，请先安装SQLite命令行工具',
        details: String(error)
      }, { status: 500 });
    }
    
    // 创建临时SQL文件
    const sqlFilePath = path.join(cwd, 'create_postmark_table.sql');
    fs.writeFileSync(sqlFilePath, `
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
      
      -- 检查表是否为空，如果为空则添加初始记录
      INSERT INTO "PostmarkSetting" ("apiToken", "fromEmail", "messageStream", "enabled", "updatedAt")
      SELECT '0addebb5-6e41-44b6-af05-7ec14d9e2852', 'no-reply@chinato.ca', 'outbound', 1, datetime('now')
      WHERE NOT EXISTS (SELECT 1 FROM "PostmarkSetting" LIMIT 1);
    `);
    
    // 执行SQLite命令
    try {
      const { stdout, stderr } = await execPromise(`sqlite3 "${dbPath}" < "${sqlFilePath}"`);
      
      console.log('SQLite命令执行结果:', stdout);
      if (stderr) {
        console.error('SQLite命令错误输出:', stderr);
      }
      
      // 删除临时SQL文件
      fs.unlinkSync(sqlFilePath);
      
      // 检查表是否创建成功
      const checkResult = await execPromise(`sqlite3 "${dbPath}" "SELECT name FROM sqlite_master WHERE type='table' AND name='PostmarkSetting'"`);
      const tableExists = checkResult.stdout.trim() === 'PostmarkSetting';
      
      if (tableExists) {
        // 检查是否添加了记录
        try {
          const countResult = await execPromise(`sqlite3 "${dbPath}" "SELECT COUNT(*) FROM PostmarkSetting"`);
          const recordCount = parseInt(countResult.stdout.trim(), 10);
          
          return NextResponse.json({ 
            success: true, 
            message: `表创建成功，包含${recordCount}条记录`,
            recordCount
          });
        } catch (countError) {
          return NextResponse.json({ 
            success: true, 
            message: '表创建成功，但无法检查记录数量',
            countError: String(countError)
          });
        }
      } else {
        return NextResponse.json({ 
          success: false, 
          error: '表创建命令执行完毕，但未找到表'
        }, { status: 500 });
      }
    } catch (execError) {
      // 删除临时SQL文件
      if (fs.existsSync(sqlFilePath)) {
        fs.unlinkSync(sqlFilePath);
      }
      
      return NextResponse.json({ 
        success: false, 
        error: `执行SQLite命令失败: ${execError.message}`,
        details: execError
      }, { status: 500 });
    }
  } catch (error) {
    console.error('创建表失败:', error);
    return NextResponse.json({ 
      success: false, 
      error: String(error)
    }, { status: 500 });
  }
} 