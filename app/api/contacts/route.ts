import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
    const contact = await prisma.contact.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        website: data.website,
        message: data.message
      }
    });
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json({ error: "Error creating contact" }, { status: 500 });
  }
} 