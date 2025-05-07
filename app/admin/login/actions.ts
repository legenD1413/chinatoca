"use server"

import { cookies } from "next/headers"

export async function login(username: string, password: string): Promise<{ success: boolean; message: string }> {
  // 这里是一个简单的硬编码验证
  // 实际应用中，应该连接到数据库验证用户凭据
  if (username === "admin" && password === "admin123") {
    // 登录成功，设置cookie
    const cookieStore = cookies();
    cookieStore.set("admin_logged_in", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24小时
      path: "/",
    })
    
    return {
      success: true,
      message: "登录成功"
    }
  }
  
  return {
    success: false,
    message: "用户名或密码错误"
  }
}

export async function logout(): Promise<{ success: boolean }> {
  // 删除cookie
  const cookieStore = cookies();
  cookieStore.set("admin_logged_in", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  })
  
  return {
    success: true
  }
} 