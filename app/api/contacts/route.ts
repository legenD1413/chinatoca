import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendFormSubmissionEmail } from "@/lib/emails/postmark";

// 获取所有联系信息
export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json({ error: "Error fetching contacts" }, { status: 500 });
  }
}

// 创建新的联系信息
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // 1. 保存到数据库
    const contact = await prisma.contact.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        website: data.website,
        message: data.message
      }
    });
    
    // 2. 获取邮箱设置
    const emailSetting = await prisma.emailSetting.findFirst({
      where: {
        type: "CONTACT"
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
          'contact'
        );
        console.log("Contact notification email sent successfully");
      } catch (emailError) {
        // 仅记录错误，不影响API响应
        console.error("Failed to send contact notification email:", emailError);
      }
    }
    
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json({ error: "Error creating contact" }, { status: 500 });
  }
} 