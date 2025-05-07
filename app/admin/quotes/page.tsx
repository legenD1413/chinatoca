"use client"

import { useState, useEffect } from "react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  SearchIcon, 
  PlusIcon, 
  Trash2Icon, 
  PencilIcon, 
  EyeIcon, 
  MoreHorizontalIcon, 
  FilterIcon
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"

type Quote = {
  id: number
  fullName: string
  email: string
  phone: string
  website: string
  productCategory: string | null
  ecommercePlatform: string
  shipmentsPerMonth: string
  concerns: string
  createdAt: string
  updatedAt: string
}

export default function QuotesAdminPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const fetchQuotes = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/quotes')
      if (!response.ok) {
        throw new Error('Failed to fetch quotes')
      }
      const data = await response.json()
      setQuotes(data)
    } catch (error) {
      console.error('Error fetching quotes:', error)
      toast.error('加载报价请求失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/quotes/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete quote')
      }

      setQuotes(quotes.filter(quote => quote.id !== id))
      toast.success('报价请求已删除')
      setIsDeleteDialogOpen(false)
    } catch (error) {
      console.error('Error deleting quote:', error)
      toast.error('删除报价请求失败')
    }
  }

  const filteredQuotes = quotes.filter(quote => 
    quote.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quote.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quote.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quote.ecommercePlatform.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return formatDistanceToNow(date, { addSuffix: true, locale: zhCN })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">报价请求管理</h1>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="搜索报价请求..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <FilterIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">ID</TableHead>
              <TableHead>名称</TableHead>
              <TableHead>邮箱</TableHead>
              <TableHead>电商平台</TableHead>
              <TableHead>每月发货量</TableHead>
              <TableHead>提交时间</TableHead>
              <TableHead className="text-right w-[100px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  加载中...
                </TableCell>
              </TableRow>
            ) : filteredQuotes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  {searchQuery ? "没有找到匹配的报价请求" : "当前没有报价请求"}
                </TableCell>
              </TableRow>
            ) : (
              filteredQuotes.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell className="font-medium">{quote.id}</TableCell>
                  <TableCell>{quote.fullName}</TableCell>
                  <TableCell>{quote.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{quote.ecommercePlatform}</Badge>
                  </TableCell>
                  <TableCell>{quote.shipmentsPerMonth}</TableCell>
                  <TableCell>{formatDate(quote.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={() => {
                            setSelectedQuote(quote)
                            setIsViewDialogOpen(true)
                          }}
                        >
                          <EyeIcon className="mr-2 h-4 w-4" />
                          查看详情
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => {
                            setSelectedQuote(quote)
                            setIsDeleteDialogOpen(true)
                          }}
                          className="text-red-600"
                        >
                          <Trash2Icon className="mr-2 h-4 w-4" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* 查看详情对话框 */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>报价请求详情</DialogTitle>
          </DialogHeader>
          {selectedQuote && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">姓名</h3>
                <p>{selectedQuote.fullName}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">邮箱</h3>
                <p>{selectedQuote.email}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">电话</h3>
                <p>{selectedQuote.phone}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">网站</h3>
                <p>{selectedQuote.website}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">产品类别</h3>
                <p>{selectedQuote.productCategory || "未指定"}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">电商平台</h3>
                <p>{selectedQuote.ecommercePlatform}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">每月发货量</h3>
                <p>{selectedQuote.shipmentsPerMonth}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">提交时间</h3>
                <p>{new Date(selectedQuote.createdAt).toLocaleString()}</p>
              </div>
              <div className="space-y-2 col-span-2">
                <h3 className="text-sm font-medium text-gray-500">关注点</h3>
                <p className="whitespace-pre-wrap">{selectedQuote.concerns}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsViewDialogOpen(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除确认对话框 */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要删除这条报价请求吗？此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => selectedQuote && handleDelete(selectedQuote.id)}
              className="bg-red-600 hover:bg-red-700"
            >
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
} 