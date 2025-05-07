import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // 获取查询参数
    const { searchParams } = new URL(request.url);
    const width = searchParams.get('width') || '600';
    const height = searchParams.get('height') || '400';
    
    // 读取原始SVG文件
    const svgPath = path.join(process.cwd(), 'public', 'placeholder.svg');
    let svgContent = fs.readFileSync(svgPath, 'utf8');
    
    // 替换SVG的宽度和高度
    svgContent = svgContent.replace(/width="1200"/, `width="${width}"`);
    svgContent = svgContent.replace(/height="1200"/, `height="${height}"`);
    
    // 返回修改后的SVG
    return new NextResponse(svgContent, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400'
      }
    });
  } catch (error) {
    console.error('Error generating placeholder image:', error);
    return new NextResponse('Error generating image', { status: 500 });
  }
} 