"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileTextIcon, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [quoteCount, setQuoteCount] = useState<number>(0)
  const [contactCount, setContactCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true)
        
        // 获取报价请求数量
        const quotesResponse = await fetch('/api/quotes')
        if (quotesResponse.ok) {
          const quotesData = await quotesResponse.json()
          setQuoteCount(quotesData.length)
        }
        
        // 获取联系信息数量
        const contactsResponse = await fetch('/api/contacts')
        if (contactsResponse.ok) {
          const contactsData = await contactsResponse.json()
          setContactCount(contactsData.length)
        }
      } catch (error) {
        console.error('Error fetching counts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCounts()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">管理员仪表盘</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/admin/quotes">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-2xl font-bold">报价请求</CardTitle>
              <FileTextIcon className="h-6 w-6 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold">
                {loading ? "..." : quoteCount}
              </div>
              <p className="text-sm text-muted-foreground pt-1">
                共有 {quoteCount} 条报价请求需要处理
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/contacts">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-2xl font-bold">联系信息</CardTitle>
              <MessageSquare className="h-6 w-6 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold">
                {loading ? "..." : contactCount}
              </div>
              <p className="text-sm text-muted-foreground pt-1">
                共有 {contactCount} 条联系信息
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
} 