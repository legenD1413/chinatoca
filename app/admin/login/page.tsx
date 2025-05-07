"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import Link from "next/link"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // 在客户端验证 - 实际应用中应使用服务器端验证
      if (username === "admin" && password === "admin123") {
        // 模拟登录成功
        // 我们不能直接使用server actions，因为有类型错误
        // 暂时使用localStorage作为临时解决方案
        localStorage.setItem("admin_logged_in", "true")
        
        // 设置cookie (模拟，实际应使用服务器端设置)
        document.cookie = `admin_logged_in=true; path=/; max-age=${60 * 60 * 24}`;
        
        toast.success("登录成功")
        
        // 重定向到管理后台
        setTimeout(() => {
          router.push("/admin")
        }, 1000)
      } else {
        toast.error("用户名或密码错误")
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error("登录失败")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">管理员登录</CardTitle>
          <CardDescription className="text-center">
            输入您的管理员凭据以访问后台
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">用户名</Label>
              <Input
                id="username"
                placeholder="输入用户名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                placeholder="输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "登录中..." : "登录"}
            </Button>
          </CardFooter>
        </form>
        <div className="p-4 text-center text-sm text-gray-500">
          <Link href="/" className="underline hover:text-gray-700">
            返回网站首页
          </Link>
        </div>
      </Card>
    </div>
  )
} 