import { PrismaClient } from '../lib/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // 清除现有数据
  await prisma.quote.deleteMany();
  await prisma.contact.deleteMany();

  // 添加报价请求示例数据
  await prisma.quote.createMany({
    data: [
      {
        fullName: '张三',
        email: 'zhangsan@example.com',
        phone: '13812345678',
        website: 'https://example.com',
        productCategory: '电子产品',
        ecommercePlatform: 'shopify',
        shipmentsPerMonth: '101-500',
        concerns: '我需要一个能够帮助处理海关清关的物流解决方案。',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: '李四',
        email: 'lisi@example.com',
        phone: '13987654321',
        website: 'https://lisi-shop.com',
        productCategory: '服装',
        ecommercePlatform: 'woocommerce',
        shipmentsPerMonth: '501-1000',
        concerns: '我们需要一个能够跟踪货物实时状态的系统。',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1天前
        updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    ],
  });

  // 添加联系表单示例数据
  await prisma.contact.createMany({
    data: [
      {
        fullName: '王五',
        email: 'wangwu@example.com',
        phone: '13712345678',
        website: 'https://wangwu.com',
        message: '请问你们提供加拿大全境的配送服务吗？',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: '赵六',
        email: 'zhaoliu@example.com',
        phone: '13612345678',
        website: 'https://zhaoliu.com',
        message: '我想了解一下你们的仓储服务价格。',
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2天前
        updatedAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
      },
    ],
  });

  console.log('测试数据已添加成功！');
}

main()
  .catch((e) => {
    console.error('添加测试数据失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 