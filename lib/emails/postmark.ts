import * as postmark from 'postmark';
import { prisma } from "@/lib/prisma";

// 获取Postmark设置
async function getPostmarkSettings() {
  try {
    const settings = await prisma.postmarkSetting.findFirst();
    if (!settings) {
      return {
        apiToken: "0addebb5-6e41-44b6-af05-7ec14d9e2852", // 默认值，应当在配置中修改
        fromEmail: "no-reply@chinato.ca",
        replyToEmail: null,
        messageStream: "outbound",
        enabled: true
      };
    }
    return settings;
  } catch (error) {
    console.error("获取Postmark设置失败:", error);
    return {
      apiToken: "0addebb5-6e41-44b6-af05-7ec14d9e2852", // 默认值，应当在配置中修改
      fromEmail: "no-reply@chinato.ca",
      replyToEmail: null,
      messageStream: "outbound",
      enabled: true
    };
  }
}

// 将字段名转换为用户友好的显示名
function getFieldDisplayName(key: string): string {
  const displayNames: Record<string, string> = {
    fullName: '姓名',
    email: '邮箱',
    phone: '电话',
    website: '网站',
    productCategory: '产品类别',
    ecommercePlatform: '电商平台',
    shipmentsPerMonth: '每月发货量',
    concerns: '关注点',
    message: '留言内容'
  };
  
  return displayNames[key] || key;
}

/**
 * 发送表单提交通知邮件
 * @param data - 表单数据
 * @param toEmails - 收件人邮箱，多个邮箱用逗号分隔
 * @param ccEmails - 抄送邮箱，多个邮箱用逗号分隔
 * @param bccEmails - 密送邮箱，多个邮箱用逗号分隔
 * @param subject - 邮件主题
 * @param formType - 表单类型，如 'quote' 或 'contact'
 */
export async function sendFormSubmissionEmail(
  data: Record<string, any>,
  toEmails: string,
  ccEmails?: string,
  bccEmails?: string,
  subject?: string,
  formType: 'quote' | 'contact' = 'quote'
) {
  // 获取Postmark设置
  const settings = await getPostmarkSettings();
  
  // 如果邮件发送被禁用，则直接返回
  if (!settings.enabled) {
    console.log("邮件发送已禁用");
    return { success: false, error: "邮件发送已禁用" };
  }
  
  // 初始化Postmark客户端
  const client = new postmark.ServerClient(settings.apiToken);
  
  // 准备邮件内容
  const emailSubject = subject || 
    (formType === 'quote' ? '新的报价请求 - ChinaTo.ca' : '新的联系表单提交 - ChinaTo.ca');
  
  // 创建HTML表格内容
  const tableRows = Object.entries(data).map(([key, value]) => {
    const fieldName = getFieldDisplayName(key);
    return `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">${fieldName}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${value || '未提供'}</td>
      </tr>
    `;
  }).join('');

  const htmlBody = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
          th, td { padding: 12px; text-align: left; border: 1px solid #ddd; }
          th { background-color: #f2f2f2; }
          .footer { margin-top: 30px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <h2>${formType === 'quote' ? '新的报价请求' : '新的联系表单提交'}</h2>
        <p>您收到了一个新的${formType === 'quote' ? '报价请求' : '联系表单提交'}。详细信息如下：</p>
        
        <table>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
        
        <p>提交时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</p>
        
        <div class="footer">
          <p>此邮件由系统自动发送，请勿直接回复。</p>
          <p>© ${new Date().getFullYear()} ChinaTo.ca. 保留所有权利。</p>
        </div>
      </body>
    </html>
  `;

  const textBody = `
新的${formType === 'quote' ? '报价请求' : '联系表单提交'} - ChinaTo.ca

您收到了一个新的${formType === 'quote' ? '报价请求' : '联系表单提交'}。详细信息如下：

${Object.entries(data).map(([key, value]) => `${getFieldDisplayName(key)}: ${value || '未提供'}`).join('\n')}

提交时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}

此邮件由系统自动发送，请勿直接回复。
© ${new Date().getFullYear()} ChinaTo.ca. 保留所有权利。
  `;

  try {
    // 发送邮件
    const result = await client.sendEmail({
      From: settings.fromEmail,
      ReplyTo: settings.replyToEmail || undefined,
      To: toEmails,
      Cc: ccEmails || '',
      Bcc: bccEmails || '',
      Subject: emailSubject,
      HtmlBody: htmlBody,
      TextBody: textBody,
      MessageStream: settings.messageStream
    });
    
    console.log(`邮件发送成功，ID: ${result.MessageID}`);
    
    // 保存邮件记录到数据库
    try {
      await prisma.emailLog.create({
        data: {
          messageId: result.MessageID,
          fromEmail: settings.fromEmail,
          toEmails: toEmails,
          ccEmails: ccEmails || null,
          bccEmails: bccEmails || null,
          subject: emailSubject,
          htmlBody: htmlBody,
          textBody: textBody,
          status: 'success',
          emailType: formType
        }
      });
      console.log(`邮件记录已保存到数据库，ID: ${result.MessageID}`);
    } catch (dbError) {
      console.error('保存邮件记录失败:', dbError);
    }
    
    return { success: true, messageId: result.MessageID };
  } catch (error) {
    console.error('发送邮件失败:', error);
    
    // 保存失败的邮件记录到数据库
    try {
      await prisma.emailLog.create({
        data: {
          fromEmail: settings.fromEmail,
          toEmails: toEmails,
          ccEmails: ccEmails || null,
          bccEmails: bccEmails || null,
          subject: emailSubject,
          htmlBody: htmlBody,
          textBody: textBody,
          status: 'failed',
          errorMessage: error instanceof Error ? error.message : String(error),
          emailType: formType
        }
      });
      console.log('失败的邮件记录已保存到数据库');
    } catch (dbError) {
      console.error('保存失败邮件记录失败:', dbError);
    }
    
    return { success: false, error };
  }
} 