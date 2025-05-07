import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 获取所有邮件日志
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const status = searchParams.get('status');
    const emailType = searchParams.get('emailType');

    // 构建查询条件
    let whereClause: any = {};
    
    if (status) {
      whereClause.status = status;
    }
    
    if (emailType) {
      whereClause.emailType = emailType;
    }

    // 查询邮件日志
    const emails = await prisma.emailLog.findMany({
      where: whereClause,
      orderBy: {
        sentAt: 'desc'
      },
      take: limit,
      skip: offset
    });

    // 获取总记录数
    const total = await prisma.emailLog.count({
      where: whereClause
    });

    return NextResponse.json({
      emails,
      pagination: {
        total,
        limit,
        offset
      }
    });
  } catch (error) {
    console.error("获取邮件日志失败:", error);
    return NextResponse.json({ error: "获取邮件日志失败" }, { status: 500 });
  }
}

// 获取单个邮件详情
export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: "缺少邮件ID" }, { status: 400 });
    }
    
    const email = await prisma.emailLog.findUnique({
      where: { id }
    });
    
    if (!email) {
      return NextResponse.json({ error: "邮件不存在" }, { status: 404 });
    }
    
    return NextResponse.json(email);
  } catch (error) {
    console.error("获取邮件详情失败:", error);
    return NextResponse.json({ error: "获取邮件详情失败" }, { status: 500 });
  }
} 