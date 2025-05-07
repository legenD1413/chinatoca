import { NextRequest, NextResponse } from "next/server";
import { sendFormSubmissionEmail } from "@/lib/emails/postmark";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // 验证必填字段
    if (!data.toEmails || !data.type) {
      return NextResponse.json(
        { error: "收件人邮箱和类型为必填字段" },
        { status: 400 }
      );
    }

    // 创建测试数据
    const testData = {
      fullName: "测试用户",
      email: "test@example.com",
      phone: "1234567890",
      website: "https://example.com",
      productCategory: "测试类别",
      ecommercePlatform: "测试平台",
      shipmentsPerMonth: "测试数量",
      concerns: "这是一封测试邮件，用于验证邮箱设置是否正确。"
    };

    // 发送测试邮件
    const formType = data.type.toLowerCase() === 'quote' ? 'quote' : 'contact';
    const result = await sendFormSubmissionEmail(
      testData,
      data.toEmails,
      data.ccEmails || '',
      data.bccEmails || '',
      data.subject || `测试邮件 - ChinaTo.ca (${new Date().toLocaleString('zh-CN')})`,
      formType as 'quote' | 'contact'
    );

    if (result.success) {
      return NextResponse.json({ message: "测试邮件发送成功" });
    } else {
      return NextResponse.json(
        { error: "发送测试邮件失败", details: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("发送测试邮件失败:", error);
    return NextResponse.json({ error: "发送测试邮件失败" }, { status: 500 });
  }
} 