import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendFormSubmissionEmail } from "@/lib/emails/postmark";

// 获取所有报价请求
export async function GET() {
  try {
    const quotes = await prisma.quote.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(quotes);
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return NextResponse.json({ error: "Error fetching quotes" }, { status: 500 });
  }
}

// 创建新的报价请求
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // 1. 保存到数据库
    const quote = await prisma.quote.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        website: data.website,
        productCategory: data.productCategory || null,
        ecommercePlatform: data.ecommercePlatform,
        shipmentsPerMonth: data.shipmentsPerMonth,
        concerns: data.concerns
      }
    });
    
    // 2. 获取邮箱设置
    const emailSetting = await prisma.emailSetting.findFirst({
      where: {
        type: "QUOTE"
      }
    });
    
    // 3. 如果有邮箱设置，发送通知邮件
    if (emailSetting) {
      try {
        await sendFormSubmissionEmail(
          data,
          emailSetting.toEmails,
          emailSetting.ccEmails || '',
          emailSetting.bccEmails || '',
          emailSetting.subject,
          'quote'
        );
        console.log("Quote notification email sent successfully");
      } catch (emailError) {
        // 仅记录错误，不影响API响应
        console.error("Failed to send quote notification email:", emailError);
      }
    }
    
    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    console.error("Error creating quote:", error);
    return NextResponse.json({ error: "Error creating quote" }, { status: 500 });
  }
} 