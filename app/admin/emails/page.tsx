"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"
import { Loader2, Mail, AlertTriangle, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"

interface EmailLog {
  id: number
  messageId: string | null
  fromEmail: string
  toEmails: string
  ccEmails: string | null
  bccEmails: string | null
  subject: string
  htmlBody: string | null
  textBody: string | null
  status: string
  errorMessage: string | null
  emailType: string
  sentAt: string
}

export default function EmailsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [emails, setEmails] = useState<EmailLog[]>([])
  const [selectedEmail, setSelectedEmail] = useState<EmailLog | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 50,
    offset: 0
  })

  // 获取邮件列表
  const fetchEmails = async () => {
    try {
      setIsLoading(true)
      
      let url = `/api/emails?limit=${pagination.limit}&offset=${pagination.offset}`
      if (statusFilter && statusFilter !== "all") url += `&status=${statusFilter}`
      if (typeFilter && typeFilter !== "all") url += `&emailType=${typeFilter}`
      
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setEmails(data.emails)
        setPagination(prev => ({
          ...prev,
          total: data.pagination.total
        }))
      } else {
        toast.error("加载邮件列表失败")
      }
    } catch (error) {
      console.error("获取邮件列表失败:", error)
      toast.error("获取邮件列表失败")
    } finally {
      setIsLoading(false)
    }
  }

  // 获取邮件详情
  const fetchEmailDetail = async (id: number) => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setSelectedEmail(data)
        setIsDialogOpen(true)
      } else {
        toast.error("获取邮件详情失败")
      }
    } catch (error) {
      console.error("获取邮件详情失败:", error)
      toast.error("获取邮件详情失败")
    } finally {
      setIsLoading(false)
    }
  }

  // 初始加载
  useEffect(() => {
    fetchEmails()
  }, [statusFilter, typeFilter, pagination.offset, pagination.limit])

  // 翻页处理
  const handlePreviousPage = () => {
    if (pagination.offset - pagination.limit >= 0) {
      setPagination(prev => ({
        ...prev,
        offset: prev.offset - prev.limit
      }))
    }
  }

  const handleNextPage = () => {
    if (pagination.offset + pagination.limit < pagination.total) {
      setPagination(prev => ({
        ...prev,
        offset: prev.offset + prev.limit
      }))
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">邮件管理</h1>
      <p className="text-gray-500 mb-8">
        查看和管理系统发送的所有邮件记录。
      </p>
      
      {/* 筛选器 */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-md">筛选条件</CardTitle>
          <CardDescription>
            根据邮件状态和类型进行筛选
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <div className="w-full sm:w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="所有状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有状态</SelectItem>
                <SelectItem value="success">发送成功</SelectItem>
                <SelectItem value="failed">发送失败</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full sm:w-48">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="所有类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有类型</SelectItem>
                <SelectItem value="quote">报价请求</SelectItem>
                <SelectItem value="contact">联系表单</SelectItem>
                <SelectItem value="system">系统通知</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      {/* 邮件列表 */}
      <Card>
        <CardHeader>
          <CardTitle>邮件记录</CardTitle>
          <CardDescription>
            共 {pagination.total} 条记录，当前显示 {Math.min(pagination.offset + 1, pagination.total)} - {Math.min(pagination.offset + pagination.limit, pagination.total)} 条
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          ) : emails.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Mail className="h-12 w-12 text-gray-400 mb-3" />
              <p className="text-gray-500">暂无邮件记录</p>
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>主题</TableHead>
                      <TableHead>收件人</TableHead>
                      <TableHead>类型</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>发送时间</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {emails.map((email) => (
                      <TableRow key={email.id}>
                        <TableCell className="font-medium">{email.id}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{email.subject}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{email.toEmails}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {email.emailType === 'quote' ? '报价请求' : 
                             email.emailType === 'contact' ? '联系表单' : '系统通知'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {email.status === 'success' ? (
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              发送成功
                            </Badge>
                          ) : (
                            <Badge variant="destructive">
                              发送失败
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {formatDistanceToNow(new Date(email.sentAt), { 
                            addSuffix: true,
                            locale: zhCN
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => fetchEmailDetail(email.id)}>
                            查看
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {/* 分页控制 */}
              <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={pagination.offset === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  上一页
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={pagination.offset + pagination.limit >= pagination.total}
                >
                  下一页
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      
      {/* 邮件详情对话框 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>邮件详情</DialogTitle>
            <DialogDescription>
              ID: {selectedEmail?.id} - 
              {selectedEmail?.status === 'success' ? '发送成功' : '发送失败'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedEmail && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">主题</h3>
                  <p className="text-gray-700">{selectedEmail.subject}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">发送时间</h3>
                  <p className="text-gray-700">
                    {new Date(selectedEmail.sentAt).toLocaleString('zh-CN', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">发件人</h3>
                  <p className="text-gray-700">{selectedEmail.fromEmail}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">邮件ID</h3>
                  <p className="text-gray-700">{selectedEmail.messageId || '无'}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium">收件人</h3>
                <p className="text-gray-700">{selectedEmail.toEmails}</p>
              </div>
              
              {selectedEmail.ccEmails && (
                <div>
                  <h3 className="text-sm font-medium">抄送</h3>
                  <p className="text-gray-700">{selectedEmail.ccEmails}</p>
                </div>
              )}
              
              {selectedEmail.bccEmails && (
                <div>
                  <h3 className="text-sm font-medium">密送</h3>
                  <p className="text-gray-700">{selectedEmail.bccEmails}</p>
                </div>
              )}
              
              {selectedEmail.status === 'failed' && selectedEmail.errorMessage && (
                <div className="bg-red-50 p-3 rounded-md border border-red-200">
                  <h3 className="text-sm font-medium text-red-800 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    错误信息
                  </h3>
                  <p className="text-red-700 text-sm">{selectedEmail.errorMessage}</p>
                </div>
              )}
              
              <Tabs defaultValue="html">
                <TabsList>
                  <TabsTrigger value="html">HTML内容</TabsTrigger>
                  <TabsTrigger value="text">纯文本内容</TabsTrigger>
                </TabsList>
                <TabsContent value="html" className="mt-4">
                  <div className="border rounded-md p-4 bg-white">
                    {selectedEmail.htmlBody ? (
                      <div dangerouslySetInnerHTML={{ __html: selectedEmail.htmlBody }} />
                    ) : (
                      <p className="text-gray-500">无HTML内容</p>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="text" className="mt-4">
                  <div className="border rounded-md p-4 bg-white font-mono text-sm whitespace-pre-wrap">
                    {selectedEmail.textBody || '无纯文本内容'}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 