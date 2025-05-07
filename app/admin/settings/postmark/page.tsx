"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { InfoIcon, RefreshCw, Save, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FixDatabaseButton } from "./fix-database"

// 定义Postmark设置接口
interface PostmarkSetting {
  id?: number
  apiToken: string
  fromEmail: string
  replyToEmail?: string
  messageStream: string
  enabled: boolean
}

export default function PostmarkSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [showApiToken, setShowApiToken] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [originalApiToken, setOriginalApiToken] = useState("")
  const [initializeFailed, setInitializeFailed] = useState(false)
  
  // 表单状态
  const [formData, setFormData] = useState<PostmarkSetting>({
    apiToken: "",
    fromEmail: "",
    replyToEmail: "",
    messageStream: "outbound",
    enabled: true
  })

  // 获取Postmark设置
  const fetchSettings = async () => {
    try {
      setIsLoading(true)
      setInitializeFailed(false)
      
      console.log('正在获取Postmark设置...')
      const response = await fetch('/api/settings/postmark', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      
      console.log('获取设置响应状态:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('获取到设置数据:', data)
        setFormData(data)
        setOriginalApiToken(data.apiToken || "")
      } else {
        const error = await response.json()
        console.error("获取Postmark设置失败:", error)
        toast.error("获取Postmark设置失败")
        
        // 如果获取失败，可以尝试初始化设置，但不自动执行
        // 因为可能会导致循环错误
        setInitializeFailed(true)
      }
    } catch (error) {
      console.error("加载Postmark设置失败:", error)
      toast.error("加载Postmark设置失败")
      setInitializeFailed(true)
    } finally {
      setIsLoading(false)
    }
  }

  // 手动初始化设置
  const handleInitializeSettings = async () => {
    try {
      setIsLoading(true)
      console.log("正在手动初始化Postmark设置...")
      
      // 使用默认值创建设置
      const response = await fetch('/api/settings/postmark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        cache: 'no-store',
        body: JSON.stringify({
          apiToken: "0addebb5-6e41-44b6-af05-7ec14d9e2852",
          fromEmail: "no-reply@chinato.ca",
          messageStream: "outbound",
          enabled: true
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        setFormData(data)
        setOriginalApiToken(data.apiToken || "")
        setInitializeFailed(false)
        toast.success("Postmark设置初始化成功")
        console.log("Postmark设置初始化成功")
      } else {
        const error = await response.json()
        console.error("无法初始化Postmark设置:", error)
        toast.error(`初始化失败: ${error.error || error.message || '未知错误'}`)
      }
    } catch (error) {
      console.error("初始化Postmark设置失败:", error)
      toast.error("初始化Postmark设置失败，请尝试使用数据库诊断工具")
    } finally {
      setIsLoading(false)
    }
  }

  // 初始加载设置
  useEffect(() => {
    fetchSettings()
  }, [])

  // 处理输入更改
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => {
      const newData = { ...prev, [name]: value }
      return newData
    })
    setSaveStatus('idle')
  }

  // 处理开关更改
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => {
      const newData = { ...prev, enabled: checked }
      return newData
    })
    setSaveStatus('idle')
  }

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setIsLoading(true)
      setSaveStatus('idle')
      
      // 如果API令牌看起来被遮蔽了（包含 *），并且没有更改过，使用原始令牌
      const submitData = { ...formData }
      if (submitData.apiToken.includes('*') && !isTokenChanged()) {
        submitData.apiToken = originalApiToken
      }

      console.log('提交数据:', JSON.stringify(submitData))
      
      const response = await fetch('/api/settings/postmark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(submitData),
        cache: 'no-store',
      })
      
      const responseData = await response.json()
      console.log('服务器响应:', responseData)
      
      if (response.ok) {
        setFormData(responseData)
        setOriginalApiToken(responseData.apiToken)
        setSaveStatus('success')
        toast.success('Postmark设置保存成功!')
      } else {
        setSaveStatus('error')
        toast.error(`保存失败: ${responseData.message || responseData.error || '未知错误'}`)
      }
    } catch (error) {
      console.error('保存Postmark设置失败:', error)
      setSaveStatus('error')
      toast.error('保存Postmark设置失败，请检查网络连接')
    } finally {
      setIsLoading(false)
    }
  }

  // 判断API令牌是否被更改
  const isTokenChanged = () => {
    return formData.apiToken !== originalApiToken && !formData.apiToken.includes('*')
  }

  // 测试Postmark连接
  const testConnection = async () => {
    try {
      setIsTesting(true)
      
      // 如果API令牌看起来被遮蔽了（包含 *），并且没有更改过，使用原始令牌
      const testData = { ...formData }
      if (testData.apiToken.includes('*') && !isTokenChanged()) {
        testData.apiToken = originalApiToken
      }
      
      const response = await fetch('/api/settings/postmark', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(testData),
        cache: 'no-store'
      })
      
      const result = await response.json()
      
      if (response.ok && result.success) {
        toast.success(`连接测试成功! 邮件ID: ${result.details?.messageId || '未知'}`, {
          duration: 6000,
        })
      } else {
        toast.error(`连接测试失败: ${result.details || result.error || '未知错误'}`, {
          duration: 6000,
        })
      }
    } catch (error) {
      console.error('测试Postmark连接失败:', error)
      toast.error('测试Postmark连接失败')
    } finally {
      setIsTesting(false)
    }
  }

  // 切换显示/隐藏API令牌
  const toggleShowApiToken = () => {
    setShowApiToken(!showApiToken)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Postmark服务设置</h1>
      <p className="text-gray-500 mb-8">
        配置Postmark邮件服务的基本设置，用于发送系统通知邮件。
      </p>

      {/* 数据库修复工具 */}
      <div className="mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-md">数据库诊断工具</CardTitle>
            <CardDescription>
              如果设置无法保存，可能是数据库问题，请使用此工具诊断和修复
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FixDatabaseButton />
          </CardContent>
        </Card>
      </div>

      {/* 初始化失败警告 */}
      {initializeFailed && (
        <Alert variant="destructive" className="mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>初始化失败</AlertTitle>
          <AlertDescription className="flex flex-col gap-2">
            <p>无法加载或初始化Postmark设置，请尝试手动初始化或使用数据库诊断工具。</p>
            <Button 
              onClick={handleInitializeSettings}
              variant="outline"
              size="sm"
              className="w-fit"
              disabled={isLoading}
            >
              {isLoading ? "初始化中..." : "手动初始化"}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <Alert className="mb-8">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>提示</AlertTitle>
        <AlertDescription>
          要使用Postmark发送邮件，您需要拥有一个Postmark账户。获取API令牌和验证发件人邮箱请访问 
          <a 
            href="https://postmarkapp.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline ml-1"
          >
            Postmark官网
          </a>。
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Postmark基本设置</CardTitle>
          <CardDescription>
            设置Postmark API令牌和发件人邮箱，以便系统能够发送邮件通知
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="apiToken" className="flex items-center justify-between">
                <span>API令牌 <span className="text-red-500">*</span></span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={toggleShowApiToken}
                  className="h-6 text-xs"
                >
                  {showApiToken ? '隐藏' : '显示'}
                </Button>
              </Label>
              <Input
                id="apiToken"
                name="apiToken"
                type={showApiToken ? "text" : "password"}
                placeholder="例如: 0addebb5-6e41-44b6-af05-7ec14d9e2852"
                value={formData.apiToken}
                onChange={handleInputChange}
                required
              />
              <p className="text-sm text-gray-500">
                在Postmark控制面板的"API Tokens"页面获取。
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fromEmail">发件人邮箱 <span className="text-red-500">*</span></Label>
              <Input
                id="fromEmail"
                name="fromEmail"
                type="email"
                placeholder="例如: no-reply@yourdomain.com"
                value={formData.fromEmail}
                onChange={handleInputChange}
                required
              />
              <p className="text-sm text-gray-500">
                必须是已在Postmark中验证过的发件人地址。
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="replyToEmail">回复邮箱</Label>
              <Input
                id="replyToEmail"
                name="replyToEmail"
                type="email"
                placeholder="例如: support@yourdomain.com"
                value={formData.replyToEmail || ""}
                onChange={handleInputChange}
              />
              <p className="text-sm text-gray-500">
                可选。当收件人回复邮件时的默认接收地址。
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="messageStream">消息流</Label>
              <Input
                id="messageStream"
                name="messageStream"
                placeholder="例如: outbound"
                value={formData.messageStream}
                onChange={handleInputChange}
              />
              <p className="text-sm text-gray-500">
                Postmark消息流名称，默认为"outbound"。
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="enabled"
                checked={formData.enabled}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="enabled">启用邮件发送</Label>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between items-center">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button 
                type="submit" 
                disabled={isLoading || isTesting}
                className="w-full sm:w-auto"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    保存中...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    保存设置
                  </>
                )}
              </Button>
              {saveStatus === 'success' && (
                <span className="text-green-600 text-sm ml-2">✓ 已保存</span>
              )}
              {saveStatus === 'error' && (
                <span className="text-red-600 text-sm ml-2">✗ 保存失败</span>
              )}
            </div>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={testConnection} 
              disabled={isLoading || isTesting || !formData.apiToken || !formData.fromEmail}
              className="w-full sm:w-auto"
            >
              {isTesting ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  测试中...
                </>
              ) : (
                "测试连接"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">注意事项</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>API令牌用于与Postmark API进行身份验证，请妥善保管。</li>
          <li>发件人邮箱必须在Postmark中通过验证，否则邮件将无法发送。</li>
          <li>如果禁用邮件发送，系统将不会发送任何邮件通知。</li>
          <li>更改设置后，建议进行连接测试以确保配置正确。</li>
        </ul>
      </div>
    </div>
  )
} 