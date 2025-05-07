import { sendFormSubmissionEmail } from "./emails/postmark";
import { prisma } from "./prisma";

async function main() {
  console.log("开始测试邮件发送流程...");
  
  try {
    // 1. 获取邮箱设置
    console.log("1. 获取邮箱设置");
    const emailSetting = await prisma.emailSetting.findFirst({
      where: {
        type: "QUOTE"
      }
    });
    
    if (!emailSetting) {
      console.error("错误: 未找到QUOTE类型的邮箱设置");
      return;
    }
    
    console.log(`找到邮箱设置: ${JSON.stringify(emailSetting, null, 2)}`);
    
    // 2. 获取Postmark设置
    console.log("2. 获取Postmark设置");
    const postmarkSetting = await prisma.postmarkSetting.findFirst();
    console.log(`Postmark设置: ${JSON.stringify(postmarkSetting, null, 2)}`);
    
    // 3. 测试数据
    const testData = {
      fullName: "测试用户",
      email: "test@example.com",
      phone: "1234567890",
      website: "https://example.com",
      productCategory: "electronics",
      ecommercePlatform: "shopify",
      shipmentsPerMonth: "101-500",
      concerns: "测试邮件发送流程"
    };
    
    // 4. 发送测试邮件
    console.log("3. 发送测试邮件");
    const result = await sendFormSubmissionEmail(
      testData,
      emailSetting.toEmails,
      emailSetting.ccEmails || '',
      emailSetting.bccEmails || '',
      emailSetting.subject,
      'quote'
    );
    
    // 5. 输出结果
    console.log("4. 发送结果:", result);
    if (result.success) {
      console.log("✅ 邮件发送成功！");
    } else {
      console.error("❌ 邮件发送失败:", result.error);
    }
  } catch (error) {
    console.error("测试过程中出错:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(e => {
  console.error("测试脚本执行失败:", e);
  process.exit(1);
}); 