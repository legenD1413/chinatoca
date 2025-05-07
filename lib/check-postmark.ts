import * as postmark from 'postmark';
import { prisma } from "./prisma";

async function main() {
  try {
    console.log("开始检查Postmark配置...");

    // 1. 检查Postmark设置
    const postmarkSettings = await prisma.postmarkSetting.findFirst();
    if (!postmarkSettings) {
      console.error("❌ 错误: 未找到Postmark设置");
      return;
    }

    console.log("Postmark设置:", JSON.stringify({
      apiToken: postmarkSettings.apiToken.substring(0, 8) + "..." + postmarkSettings.apiToken.substring(postmarkSettings.apiToken.length - 4),
      fromEmail: postmarkSettings.fromEmail,
      replyToEmail: postmarkSettings.replyToEmail,
      messageStream: postmarkSettings.messageStream,
      enabled: postmarkSettings.enabled
    }, null, 2));

    if (!postmarkSettings.enabled) {
      console.error("❌ 警告: Postmark发送功能已禁用");
      return;
    }

    // 2. 检查邮件设置
    const emailSettings = await prisma.emailSetting.findMany();
    if (emailSettings.length === 0) {
      console.error("❌ 错误: 未找到任何邮件设置");
      return;
    }

    console.log("找到邮件设置:", emailSettings.length, "条");
    emailSettings.forEach(setting => {
      console.log(`- 类型: ${setting.type}, 收件人: ${setting.toEmails}, 主题: ${setting.subject}`);
    });

    // 3. 测试Postmark连接
    console.log("\n开始测试Postmark API连接...");
    const client = new postmark.ServerClient(postmarkSettings.apiToken);
    
    try {
      const serverInfo = await client.getServer();
      console.log("✅ Postmark API连接成功!");
      console.log("服务器名称:", serverInfo.Name);
      console.log("服务器颜色:", serverInfo.Color);
      console.log("发件域名:", serverInfo.DeliveryDomain || "未设置");
      console.log("SMTP API已激活:", serverInfo.SmtpApiActivated);
      console.log("跟踪选项:", JSON.stringify(serverInfo.TrackOpens));
    } catch (apiError) {
      console.error("❌ Postmark API连接失败:", apiError);
      return;
    }

    // 4. 检查发件人域名验证
    try {
      console.log("\n检查发件人域名验证状态...");
      const fromEmailDomain = postmarkSettings.fromEmail.split('@')[1];
      
      const domains = await client.getDomains();
      const domainFound = domains.Domains.find(d => d.Name === fromEmailDomain);
      
      if (domainFound) {
        console.log(`✅ 域名 ${fromEmailDomain} 已在Postmark中配置`);
        console.log(`- SPF状态: ${domainFound.SPFVerified ? '已验证' : '未验证'}`);
        console.log(`- DKIM状态: ${domainFound.DKIMVerified ? '已验证' : '未验证'}`);
        console.log(`- 所有权状态: ${domainFound.ReturnPathDomainVerified ? '已验证' : '未验证'}`);
      } else {
        console.error(`❌ 警告: 域名 ${fromEmailDomain} 未在Postmark中配置`);
        
        // 检查发送者签名
        console.log("检查发送者签名...");
        const senders = await client.getSenderSignatures();
        const senderFound = senders.SenderSignatures.find(s => 
          s.EmailAddress === postmarkSettings.fromEmail || 
          s.EmailAddress.endsWith('@' + fromEmailDomain)
        );
        
        if (senderFound) {
          console.log(`✅ 发送者 ${senderFound.EmailAddress} 已在Postmark中配置`);
          console.log(`- 验证状态: ${senderFound.Confirmed ? '已验证' : '未验证'}`);
          console.log(`- SPF状态: ${senderFound.SPFVerified ? '已验证' : '未验证'}`);
          console.log(`- DKIM状态: ${senderFound.DKIMVerified ? '已验证' : '未验证'}`);
        } else {
          console.error(`❌ 错误: 发送者 ${postmarkSettings.fromEmail} 未在Postmark中配置或验证`);
          console.log("请在Postmark中添加并验证此发送者邮箱，或使用已验证的发送者邮箱。");
        }
      }
    } catch (verifyError) {
      console.error("❌ 检查域名验证状态失败:", verifyError);
    }

    console.log("\n检查完成!");
  } catch (error) {
    console.error("检查过程中出错:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(e => {
  console.error("脚本执行失败:", e);
  process.exit(1);
}); 