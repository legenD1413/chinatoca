# Postmark 邮件服务集成

本文档介绍了ChinaTo.ca网站中Postmark邮件服务的集成和配置方法。

## 功能概述

Postmark集成用于以下功能：

1. 表单提交通知：当用户提交报价请求或联系表单时，系统会向管理员发送通知邮件
2. 系统通知：系统状态变更、错误报告等通知

## 配置

### 管理员设置

系统提供了两个主要的邮件设置页面：

#### 1. Postmark基本设置

位置：`/admin/settings/postmark`

此页面用于配置Postmark服务的基本参数：

- API令牌：用于身份验证的Postmark API Token
- 发件人邮箱：所有系统邮件的默认发件人地址
- 回复邮箱：用户回复邮件时的默认接收地址
- 消息流：Postmark消息流名称
- 启用/禁用邮件发送：控制是否发送邮件通知

#### 2. 邮箱通知设置

位置：`/admin/settings/email`

此页面用于配置不同类型表单的接收邮箱：

- 报价请求通知：配置接收报价请求通知的邮箱
- 联系表单通知：配置接收联系表单通知的邮箱

对于每种类型，可以设置：
- 收件人邮箱（To）
- 抄送邮箱（CC）
- 密送邮箱（BCC）
- 邮件主题

## 技术实现

### 数据库模型

系统使用以下数据库模型存储邮件设置：

1. `PostmarkSetting`：存储Postmark服务配置
   - apiToken：Postmark API令牌
   - fromEmail：默认发件人邮箱
   - replyToEmail：默认回复邮箱
   - messageStream：消息流名称
   - enabled：是否启用邮件发送

2. `EmailSetting`：存储邮件通知接收设置
   - type：设置类型（'QUOTE'或'CONTACT'）
   - toEmails：收件人邮箱列表（逗号分隔）
   - ccEmails：抄送邮箱列表（逗号分隔）
   - bccEmails：密送邮箱列表（逗号分隔）
   - subject：邮件主题

### API路由

- `/api/settings/postmark`：管理Postmark基本设置
- `/api/settings/email`：管理邮件通知接收设置

## 故障排除

### 常见问题

#### 1. 数据库中缺少PostmarkSetting表

**症状**：无法保存Postmark设置，后台显示"数据库问题"警告。

**解决方案**：
1. 使用管理员后台的"数据库诊断"工具：
   - 进入 `/admin/settings/postmark` 页面
   - 点击"检查数据库"按钮
   - 如果显示缺少表，点击"修复数据库"按钮

2. 如果自动修复失败，请尝试手动步骤：
   - 关闭所有使用数据库的应用（包括网站）
   - 以管理员身份运行命令提示符
   - 进入项目目录
   - 执行 `npx prisma db push`
   - 如果仍然失败，执行 `npx prisma migrate dev`

#### 2. 权限错误

**症状**：执行数据库迁移命令时出现 "Access is denied" 或 "无法重命名DLL文件"错误。

**解决方案**：
1. 确保以管理员身份运行命令提示符
2. 关闭所有可能正在使用数据库的应用程序
3. 尝试使用`--force`标志：`npx prisma db push --force`

#### 3. BigInt序列化错误

**症状**：数据库检查时出现JSON序列化错误。

**解决方案**：
这个问题已在系统中修复，最新版本应自动处理BigInt序列化。如果仍然遇到问题：
1. 刷新页面后重试
2. 清除浏览器缓存
3. 如果问题持续存在，请联系技术支持

### 诊断工具

系统提供了几个诊断和修复工具：

1. **数据库检查**：检查数据库结构和连接状态
   - 位置：`/admin/settings/postmark` 页面底部
   - 功能：验证数据库连接和表结构

2. **数据库修复**：尝试自动修复数据库问题
   - 位置：同上，当检测到问题时出现
   - 功能：尝试多种方法创建缺失的表

3. **API诊断端点**：
   - `/api/debug/prisma`：检查Prisma状态
   - `/api/settings/postmark/create-table`：尝试创建表
   - `/api/settings/postmark/create-manual`：使用SQLite命令行创建表

### 安装必备工具

如果需要手动修复数据库，请确保安装以下工具：

1. **SQLite命令行工具**：用于直接操作数据库
   - Windows：从 [SQLite 下载页面](https://www.sqlite.org/download.html) 下载
   - 添加到系统环境变量 PATH 中

2. **Node.js和npm**：确保使用最新版本
   - 推荐使用 Node.js v16+ 和 npm v7+

## 联系支持

如果遇到无法解决的问题，请联系技术支持：

- 电子邮件：support@chinato.ca
- 在管理员界面中提交错误报告 