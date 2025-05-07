import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 获取单个报价请求
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const quote = await prisma.quote.findUnique({
      where: { id }
    });
    
    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }
    
    return NextResponse.json(quote);
  } catch (error) {
    console.error("Error fetching quote:", error);
    return NextResponse.json({ error: "Error fetching quote" }, { status: 500 });
  }
}

// 更新报价请求
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const data = await request.json();
    
    const quote = await prisma.quote.update({
      where: { id },
      data
    });
    
    return NextResponse.json(quote);
  } catch (error) {
    console.error("Error updating quote:", error);
    return NextResponse.json({ error: "Error updating quote" }, { status: 500 });
  }
}

// 删除报价请求
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    await prisma.quote.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting quote:", error);
    return NextResponse.json({ error: "Error deleting quote" }, { status: 500 });
  }
} 