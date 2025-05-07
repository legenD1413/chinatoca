import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 获取邮箱设置
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (!type) {
      return NextResponse.json({ error: "缺少类型参数" }, { status: 400 });
    }

    const emailSetting = await prisma.emailSetting.findFirst({
      where: {
        type: type
      }
    });

    return NextResponse.json(emailSetting);
  } catch (error) {
    console.error("获取邮箱设置失败:", error);
    return NextResponse.json({ error: "获取邮箱设置失败" }, { status: 500 });
  }
}

// 创建新的邮箱设置
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // 验证必填字段
    if (!data.type || !data.toEmails || !data.subject) {
      return NextResponse.json(
        { error: "类型、收件人邮箱和主题为必填字段" }, 
        { status: 400 }
      );
    }

    // 检查是否已存在同类型的设置
    const existingSetting = await prisma.emailSetting.findFirst({
      where: {
        type: data.type
      }
    });

    if (existingSetting) {
      return NextResponse.json(
        { error: "该类型的邮箱设置已存在，请使用PUT方法进行更新" }, 
        { status: 400 }
      );
    }

    // 创建新设置
    const emailSetting = await prisma.emailSetting.create({
      data: {
        type: data.type,
        toEmails: data.toEmails,
        ccEmails: data.ccEmails || "",
        bccEmails: data.bccEmails || "",
        subject: data.subject
      }
    });

    return NextResponse.json(emailSetting, { status: 201 });
  } catch (error) {
    console.error("创建邮箱设置失败:", error);
    return NextResponse.json({ error: "创建邮箱设置失败" }, { status: 500 });
  }
}

// 更新现有的邮箱设置
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    
    // 验证必填字段
    if (!data.type || !data.toEmails || !data.subject) {
      return NextResponse.json(
        { error: "类型、收件人邮箱和主题为必填字段" }, 
        { status: 400 }
      );
    }
    
    // 查找现有设置
    let existingSetting;
    
    if (data.id) {
      // 通过ID查找
      existingSetting = await prisma.emailSetting.findUnique({
        where: {
          id: data.id
        }
      });
    } else {
      // 通过类型查找
      existingSetting = await prisma.emailSetting.findFirst({
        where: {
          type: data.type
        }
      });
    }

    if (!existingSetting) {
      return NextResponse.json(
        { error: "未找到要更新的邮箱设置，请先创建" }, 
        { status: 404 }
      );
    }

    // 更新设置
    const updatedSetting = await prisma.emailSetting.update({
      where: {
        id: existingSetting.id
      },
      data: {
        toEmails: data.toEmails,
        ccEmails: data.ccEmails || "",
        bccEmails: data.bccEmails || "",
        subject: data.subject
      }
    });

    return NextResponse.json(updatedSetting);
  } catch (error) {
    console.error("更新邮箱设置失败:", error);
    return NextResponse.json({ error: "更新邮箱设置失败" }, { status: 500 });
  }
} 