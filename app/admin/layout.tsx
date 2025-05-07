"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ListIcon, FileTextIcon, LogOut, MailIcon, Settings, SendIcon, InboxIcon } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  // 不对登录页面应用此布局
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const handleLogout = () => {
    router.push('/admin/logout');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen">
        {/* 侧边栏 */}
        <div className={`bg-gray-800 text-white transition-all duration-300 ${collapsed ? "w-16" : "w-64"} relative`}>
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            {!collapsed && <h1 className="text-xl font-bold">管理后台</h1>}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="text-white hover:bg-gray-700"
            >
              <ChevronLeft className={`h-5 w-5 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} />
            </Button>
          </div>
          
          <nav className="p-2">
            <ul className="space-y-2">
              <li>
                <Link href="/admin" 
                  className={`flex items-center p-2 rounded-md transition-colors ${
                    pathname === "/admin" 
                      ? "bg-gray-700" 
                      : "hover:bg-gray-700"
                  }`}
                >
                  <ListIcon className="h-5 w-5 mr-3" />
                  {!collapsed && <span>仪表盘</span>}
                </Link>
              </li>
              <li>
                <Link href="/admin/quotes" 
                  className={`flex items-center p-2 rounded-md transition-colors ${
                    pathname.includes("/admin/quotes") 
                      ? "bg-gray-700" 
                      : "hover:bg-gray-700"
                  }`}
                >
                  <FileTextIcon className="h-5 w-5 mr-3" />
                  {!collapsed && <span>报价请求管理</span>}
                </Link>
              </li>
              <li>
                <Link href="/admin/contacts" 
                  className={`flex items-center p-2 rounded-md transition-colors ${
                    pathname.includes("/admin/contacts") 
                      ? "bg-gray-700" 
                      : "hover:bg-gray-700"
                  }`}
                >
                  <ListIcon className="h-5 w-5 mr-3" />
                  {!collapsed && <span>联系信息管理</span>}
                </Link>
              </li>
              <li>
                <Link href="/admin/emails" 
                  className={`flex items-center p-2 rounded-md transition-colors ${
                    pathname.includes("/admin/emails") 
                      ? "bg-gray-700" 
                      : "hover:bg-gray-700"
                  }`}
                >
                  <InboxIcon className="h-5 w-5 mr-3" />
                  {!collapsed && <span>邮件管理</span>}
                </Link>
              </li>
              <li className="pt-2 pb-2 border-t border-gray-700">
                <div className={`px-3 py-1 text-xs text-gray-400 ${collapsed ? "hidden" : ""}`}>
                  设置
                </div>
              </li>
              <li>
                <Link href="/admin/settings/email" 
                  className={`flex items-center p-2 rounded-md transition-colors ${
                    pathname.includes("/admin/settings/email") 
                      ? "bg-gray-700" 
                      : "hover:bg-gray-700"
                  }`}
                >
                  <MailIcon className="h-5 w-5 mr-3" />
                  {!collapsed && <span>邮箱通知设置</span>}
                </Link>
              </li>
              <li>
                <Link href="/admin/settings/postmark" 
                  className={`flex items-center p-2 rounded-md transition-colors ${
                    pathname.includes("/admin/settings/postmark") 
                      ? "bg-gray-700" 
                      : "hover:bg-gray-700"
                  }`}
                >
                  <SendIcon className="h-5 w-5 mr-3" />
                  {!collapsed && <span>Postmark设置</span>}
                </Link>
              </li>
              
              {/* 退出登录按钮作为导航项 */}
              <li>
                <button
                  onClick={handleLogout}
                  className={`flex items-center w-full p-2 rounded-md text-left text-gray-400 hover:text-white hover:bg-gray-700 transition-colors ${collapsed ? "justify-center" : ""}`}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  {!collapsed && <span>退出登录</span>}
                </button>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* 主内容区域 */}
        <div className="flex-1 overflow-x-auto">
          <header className="bg-white border-b p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-800">管理后台</h1>
            </div>
          </header>
          
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
} 