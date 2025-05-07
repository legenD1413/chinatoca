import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // 获取当前路径
  const path = request.nextUrl.pathname;
  
  // 如果访问的是管理后台路径且不是登录页面
  if (path.startsWith('/admin') && path !== '/admin/login') {
    // 从Cookie中检查登录状态
    const loggedIn = request.cookies.get('admin_logged_in')?.value === 'true';
    
    // 如果未登录，重定向到登录页面
    if (!loggedIn) {
      const url = new URL('/admin/login', request.url);
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

// 配置匹配的路径
export const config = {
  matcher: ['/admin/:path*'],
}; 