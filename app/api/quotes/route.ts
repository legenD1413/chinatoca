import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    console.error("Error creating quote:", error);
    return NextResponse.json({ error: "Error creating quote" }, { status: 500 });
  }
} 