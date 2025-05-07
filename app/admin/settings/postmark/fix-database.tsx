"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Check, Database, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

interface DebugInfo {
  status: string
  prismaConnected: boolean
  databaseModels: any[]
  postmarkSetting?: {
    tableExists: boolean
    columns: any[]
    data: any[]
  }
  error?: string
}

export function FixDatabaseButton() {
  const [isChecking, setIsChecking] = useState(false)
  const [isFixing, setIsFixing] = useState(false)
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [fixAttempts, setFixAttempts] = useState(0)
  const [fixLog, setFixLog] = useState<string[]>([])

  // 检查数据库状态
  const checkDatabase = async () => {
    try {
      setIsChecking(true)
      setDebugInfo(null)
      setFixLog([])
      
      const response = await fetch('/api/debug/prisma')
      const data = await response.json()
      
      setDebugInfo(data)
      
      if (data.status === 'error') {
        toast.error('数据库检查失败')
        addToLog('数据库检查失败: ' + (data.error || '未知错误'))
      } else if (data.postmarkSetting && !data.postmarkSetting.tableExists) {
        toast.warning('未找到Postmark设置表，需要修复')
        addToLog('未找到Postmark设置表，需要修复')
      } else {
        toast.success('数据库检查完成')
        addToLog('数据库检查完成，结构正常')
      }
    } catch (error) {
      console.error('检查数据库失败:', error)
      toast.error('检查数据库失败')
      addToLog('检查数据库失败: ' + (error instanceof Error ? error.message : String(error)))
    } finally {
      setIsChecking(false)
    }
  }
  
  // 添加日志
  const addToLog = (message: string) => {
    setFixLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`])
  }

  // 直接执行数据库迁移创建表
  const createTableWithMigration = async () => {
    addToLog('尝试通过直接创建表解决问题...')
    
    try {
      const response = await fetch('/api/settings/postmark/create-table', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      const result = await response.json()
      
      if (response.ok && result.success) {
        addToLog('表创建成功: ' + result.message)
        return true
      } else {
        addToLog('表创建失败: ' + (result.error || '未知错误'))
        return false
      }
    } catch (error) {
      console.error('表创建请求失败:', error)
      addToLog('表创建请求失败: ' + (error instanceof Error ? error.message : String(error)))
      return false
    }
  }

  // 添加使用手动SQL创建表的方法
  const createTableManually = async () => {
    addToLog('尝试使用手动SQL命令创建表...');
    
    try {
      const response = await fetch('/api/settings/postmark/create-manual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        addToLog('手动SQL创建表成功: ' + result.message);
        return true;
      } else {
        addToLog('手动SQL创建表失败: ' + (result.error || '未知错误'));
        
        // 如果是因为没有安装SQLite，给出特别提示
        if (result.error && result.error.includes('sqlite3命令行工具未安装')) {
          addToLog('提示: 您需要安装SQLite命令行工具。在Windows上，可以下载SQLite工具并添加到PATH环境变量中。');
        }
        
        return false;
      }
    } catch (error) {
      console.error('手动SQL表创建请求失败:', error);
      addToLog('手动SQL表创建请求失败: ' + (error instanceof Error ? error.message : String(error)));
      return false;
    }
  }

  // 修复数据库
  const fixDatabase = async () => {
    try {
      setIsFixing(true)
      setFixAttempts(prev => prev + 1)
      addToLog(`开始修复数据库 (第${fixAttempts + 1}次尝试)`)
      
      // 先检查数据库连接
      try {
        addToLog('检查数据库连接...')
        const checkResponse = await fetch('/api/debug/prisma')
        const checkData = await checkResponse.json()
        
        if (checkData.status === 'error') {
          toast.error('数据库连接检查失败，请重启应用后再试')
          addToLog('数据库连接检查失败: ' + (checkData.error || '未知错误'))
          return
        }
        
        addToLog('数据库连接正常')
      } catch (checkError) {
        console.error('数据库连接检查失败:', checkError)
        addToLog('数据库连接检查请求失败: ' + (checkError instanceof Error ? checkError.message : String(checkError)))
        toast.error('无法连接到数据库API')
        
        // 如果是JSON解析错误，可能是BigInt问题，直接继续尝试修复
        if (checkError instanceof SyntaxError && checkError.message.includes('JSON')) {
          addToLog('检测到JSON解析错误，可能是BigInt序列化问题，继续尝试修复...')
        } else {
          return
        }
      }

      // 第一步: 尝试直接创建表
      const tableCreated = await createTableWithMigration()
      
      if (tableCreated) {
        toast.success('已成功创建Postmark设置表')
        
        // 延迟重新加载页面
        setTimeout(() => {
          window.location.reload()
        }, 1500)
        
        return
      }
      
      // 第二步: 尝试手动SQL创建表
      const manuallyCreated = await createTableManually()
      
      if (manuallyCreated) {
        toast.success('已使用手动SQL命令成功创建Postmark设置表')
        
        // 延迟重新加载页面
        setTimeout(() => {
          window.location.reload()
        }, 1500)
        
        return
      }
      
      // 第三步: 如果前两种方法都失败，尝试通过POST创建设置
      addToLog('尝试通过创建设置来间接创建表...')
      
      // 尝试多次创建设置
      let success = false
      let lastError = null
      
      for (let attempt = 1; attempt <= 3 && !success; attempt++) {
        try {
          addToLog(`创建设置尝试 ${attempt}/3...`)
          
          const response = await fetch('/api/settings/postmark', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
            },
            cache: 'no-store',
            body: JSON.stringify({
              apiToken: "0addebb5-6e41-44b6-af05-7ec14d9e2852",
              fromEmail: "no-reply@chinato.ca",
              messageStream: "outbound",
              enabled: true
            }),
          })
          
          const responseData = await response.json()
          
          if (response.ok) {
            success = true
            addToLog('设置创建成功，ID: ' + (responseData.id || '未知'))
            toast.success('数据库修复成功，已创建默认Postmark设置')
            
            // 延迟重新加载页面
            setTimeout(() => {
              window.location.reload()
            }, 1500)
            
            break
          } else {
            lastError = responseData
            addToLog(`创建设置失败: ${JSON.stringify(responseData)}`)
            console.warn(`第${attempt}次修复尝试失败:`, responseData)
            // 等待一小段时间再重试
            if (attempt < 3) {
              addToLog('等待500ms后重试...')
              await new Promise(resolve => setTimeout(resolve, 500))
            }
          }
        } catch (attemptError) {
          lastError = attemptError
          addToLog(`请求错误: ${attemptError instanceof Error ? attemptError.message : String(attemptError)}`)
          console.error(`第${attempt}次修复尝试出错:`, attemptError)
          // 等待一小段时间再重试
          if (attempt < 3) {
            addToLog('等待500ms后重试...')
            await new Promise(resolve => setTimeout(resolve, 500))
          }
        }
      }
      
      if (!success) {
        const errorMessage = lastError ? 
          (typeof lastError === 'object' ? 
            (lastError.message || lastError.error || JSON.stringify(lastError)) : 
            String(lastError)
          ) : '未知错误';
          
        const errorMsg = `修复失败: ${errorMessage}`;
        toast.error(errorMsg)
        addToLog(errorMsg)
        
        // 提示用户尝试手动运行数据库迁移
        const migrationMsg = '请尝试以下步骤:\n1. 关闭所有使用该数据库的应用程序（包括本网站）\n2. 以管理员身份运行命令提示符或PowerShell\n3. 进入项目目录\n4. 执行 <code className="bg-gray-100 px-1">npx prisma migrate dev</code>\n5. 如果出现错误，可以尝试直接执行 <code className="bg-gray-100 px-1">npx prisma db push</code>\n6. 重新启动应用程序'
        toast.error(migrationMsg, { duration: 10000 })
        addToLog(migrationMsg)
        
        // 设置显示详情为true以便用户能看到错误日志
        setShowDetails(true)
      }
    } catch (error) {
      console.error('修复数据库失败:', error)
      const errorMsg = `修复数据库失败: ${error instanceof Error ? error.message : String(error)}`
      toast.error('修复数据库失败，请查看详情')
      addToLog(errorMsg)
      setShowDetails(true)
    } finally {
      setIsFixing(false)
    }
  }

  // 检查postmarkSetting属性是否存在
  const tableExists = debugInfo?.postmarkSetting?.tableExists || false
  const hasData = (debugInfo?.postmarkSetting?.data?.length || 0) > 0

  return (
    <div className="space-y-4">
      {debugInfo && !tableExists && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>数据库问题</AlertTitle>
          <AlertDescription>
            检测到数据库中缺少Postmark设置表。这可能是由于数据库迁移未完成导致的。
            请点击"修复数据库"按钮尝试解决此问题。
          </AlertDescription>
        </Alert>
      )}
      
      {debugInfo && tableExists && !hasData && (
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>数据库正常，但没有设置</AlertTitle>
          <AlertDescription>
            数据库结构正常，但尚未保存任何Postmark设置。请填写表单并保存设置。
          </AlertDescription>
        </Alert>
      )}
      
      {debugInfo && tableExists && hasData && (
        <Alert className="mb-4" variant="default">
          <Check className="h-4 w-4 text-green-500" />
          <AlertTitle>数据库正常</AlertTitle>
          <AlertDescription>
            数据库连接正常，已找到Postmark设置表和数据。
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          onClick={checkDatabase} 
          disabled={isChecking || isFixing}
          className="flex items-center"
        >
          {isChecking ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              检查中...
            </>
          ) : (
            <>
              <Database className="mr-2 h-4 w-4" />
              检查数据库
            </>
          )}
        </Button>
        
        {debugInfo && !tableExists && (
          <Button 
            variant="destructive" 
            onClick={fixDatabase} 
            disabled={isFixing || isChecking}
            className="flex items-center"
          >
            {isFixing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                修复中...
              </>
            ) : (
              <>
                <AlertCircle className="mr-2 h-4 w-4" />
                修复数据库
              </>
            )}
          </Button>
        )}
        
        <Button 
          variant="ghost" 
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center text-xs"
        >
          {showDetails ? '隐藏详情' : '显示详情'}
        </Button>
      </div>
      
      {showDetails && (
        <div className="mt-4 space-y-4">
          {fixLog.length > 0 && (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono overflow-auto max-h-60">
              {fixLog.map((log, index) => (
                <div key={index} className="pb-1">{log}</div>
              ))}
            </div>
          )}
          
          {debugInfo && (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono overflow-auto max-h-60">
              <div className="font-semibold mb-2">调试信息:</div>
              <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
            </div>
          )}
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-xs">
            <div className="font-semibold mb-2">手动修复指南:</div>
            <ol className="list-decimal list-inside space-y-1">
              <li>关闭所有使用该数据库的应用程序（包括本网站）</li>
              <li>以管理员身份运行命令提示符或PowerShell</li>
              <li>进入项目目录</li>
              <li>执行 <code className="bg-gray-100 px-1">npx prisma migrate dev</code></li>
              <li>如果出现错误，可以尝试直接执行 <code className="bg-gray-100 px-1">npx prisma db push</code></li>
              <li>重新启动应用程序</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  )
} 