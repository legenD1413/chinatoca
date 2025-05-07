"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

// 定义Email设置接口
interface EmailSetting {
  id?: number
  type: string
  toEmails: string
  ccEmails: string
  bccEmails: string
  subject: string
}

export default function EmailSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [settingType, setSettingType] = useState("QUOTE")
  const [settings, setSettings] = useState<EmailSetting | null>(null)

  // 表单状态
  const [formData, setFormData] = useState({
    toEmails: "",
    ccEmails: "",
    bccEmails: "",
    subject: ""
  })

  // 获取当前类型的邮箱设置
  const fetchSettings = async (type: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/settings/email?type=${type}`)
      if (response.ok) {
        const data = await response.json()
        if (data) {
          setSettings(data)
          setFormData({
            toEmails: data.toEmails || "",
            ccEmails: data.ccEmails || "",
            bccEmails: data.bccEmails || "",
            subject: data.subject || ""
          })
        } else {
          // 如果没有设置，则使用默认值
          setSettings(null)
          setFormData({
            toEmails: "",
            ccEmails: "",
            bccEmails: "",
            subject: type === "QUOTE" ? "新的报价请求 - ChinaTo.ca" : "新的联系表单提交 - ChinaTo.ca"
          })
        }
      } else {
        toast.error("获取邮箱设置失败")
      }
    } catch (error) {
      console.error("加载邮箱设置失败:", error)
      toast.error("加载邮箱设置失败")
    } finally {
      setIsLoading(false)
    }
  }

  // 切换设置类型时，加载对应的设置
  useEffect(() => {
    fetchSettings(settingType)
  }, [settingType])

  // 处理输入更改
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setIsLoading(true)
      
      const payload = {
        ...formData,
        type: settingType,
        id: settings?.id // 如果已存在设置，则包含ID以进行更新
      }
      
      const response = await fetch('/api/settings/email', {
        method: settings ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
        toast.success('邮箱设置保存成功!')
      } else {
        const error = await response.json()
        toast.error(`保存失败: ${error.message || '未知错误'}`)
      }
    } catch (error) {
      console.error('保存邮箱设置失败:', error)
      toast.error('保存邮箱设置失败')
    } finally {
      setIsLoading(false)
    }
  }

  // 发送测试邮件
  const sendTestEmail = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/settings/email/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: settingType
        }),
      })
      
      if (response.ok) {
        toast.success('测试邮件已发送，请检查您的邮箱')
      } else {
        const error = await response.json()
        toast.error(`发送测试邮件失败: ${error.message || '未知错误'}`)
      }
    } catch (error) {
      console.error('发送测试邮件失败:', error)
      toast.error('发送测试邮件失败')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">邮箱通知设置</h1>
      <p className="text-gray-500 mb-8">
        配置当用户提交表单时发送通知的邮箱地址。多个邮箱地址请用逗号分隔。
      </p>

      <div className="mb-6">
        <Label htmlFor="settingType" className="mb-2 block">设置类型</Label>
        <Select value={settingType} onValueChange={setSettingType}>
          <SelectTrigger className="w-full md:w-1/3">
            <SelectValue placeholder="选择设置类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="QUOTE">报价请求通知</SelectItem>
            <SelectItem value="CONTACT">联系表单通知</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{settingType === "QUOTE" ? "报价请求" : "联系表单"}邮件通知配置</CardTitle>
          <CardDescription>
            当用户提交{settingType === "QUOTE" ? "报价请求" : "联系表单"}时，系统将发送通知邮件到以下地址
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="toEmails">收件人邮箱 <span className="text-red-500">*</span></Label>
              <Input
                id="toEmails"
                name="toEmails"
                placeholder="例如: admin@example.com, manager@example.com"
                value={formData.toEmails}
                onChange={handleInputChange}
                required
              />
              <p className="text-sm text-gray-500">主要收件人，多个邮箱请用逗号分隔</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ccEmails">抄送邮箱</Label>
              <Input
                id="ccEmails"
                name="ccEmails"
                placeholder="例如: team@example.com"
                value={formData.ccEmails}
                onChange={handleInputChange}
              />
              <p className="text-sm text-gray-500">抄送收件人，多个邮箱请用逗号分隔</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bccEmails">密送邮箱</Label>
              <Input
                id="bccEmails"
                name="bccEmails"
                placeholder="例如: archive@example.com"
                value={formData.bccEmails}
                onChange={handleInputChange}
              />
              <p className="text-sm text-gray-500">密送收件人，多个邮箱请用逗号分隔</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">邮件主题 <span className="text-red-500">*</span></Label>
              <Input
                id="subject"
                name="subject"
                placeholder="例如: 新的报价请求"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between items-center">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "保存中..." : "保存设置"}
            </Button>
            <Button type="button" variant="outline" onClick={sendTestEmail} disabled={isLoading || !formData.toEmails}>
              发送测试邮件
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">提示</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>确保使用有效的邮箱地址，多个邮箱地址用逗号分隔。</li>
          <li>至少需要设置一个收件人邮箱。</li>
          <li>修改设置后，建议发送测试邮件以确认配置正确。</li>
          <li>邮件将通过 Postmark 服务发送，确保发件人地址已在 Postmark 中验证。</li>
        </ul>
      </div>
    </div>
  )
} 