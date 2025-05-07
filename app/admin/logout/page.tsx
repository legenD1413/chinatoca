"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function LogoutPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const logout = async () => {
      try {
        // 清除客户端存储
        localStorage.removeItem("admin_logged_in")
        
        // 清除cookie
        document.cookie = "admin_logged_in=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        
        toast.success("已成功退出登录")
        
        // 短暂延迟后重定向到登录页面
        setTimeout(() => {
          router.push("/admin/login")
        }, 1500)
      } catch (error) {
        console.error("Logout error:", error)
        toast.error("退出登录失败")
      } finally {
        setIsLoading(false)
      }
    }

    logout()
  }, [router])

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">退出登录</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          {isLoading ? (
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
              <p>正在退出登录...</p>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <p>您已成功退出登录</p>
              <Button onClick={() => router.push("/admin/login")}>
                返回登录页面
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 