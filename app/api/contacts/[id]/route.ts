import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 获取单个联系信息
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const contact = await prisma.contact.findUnique({
      where: { id }
    });
    
    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }
    
    return NextResponse.json(contact);
  } catch (error) {
    console.error("Error fetching contact:", error);
    return NextResponse.json({ error: "Error fetching contact" }, { status: 500 });
  }
}

// 更新联系信息
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const data = await request.json();
    
    const contact = await prisma.contact.update({
      where: { id },
      data
    });
    
    return NextResponse.json(contact);
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json({ error: "Error updating contact" }, { status: 500 });
  }
}

// 删除联系信息
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    await prisma.contact.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return NextResponse.json({ error: "Error deleting contact" }, { status: 500 });
  }
} 