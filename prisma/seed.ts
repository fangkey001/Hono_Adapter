import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // สร้างข้อมูล User ตัวอย่าง
  const user1 = await prisma.user.create({
    data: {
      code: "USER001",
      username: "john_doe",
      email: "john.doe@example.com",
      password: "hashed_password_123",
      phoneNumber: "1234567890",
      status: "active",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      code: "USER002",
      username: "jane_doe",
      email: "jane.doe@example.com",
      password: "hashed_password_456",
      phoneNumber: "0987654321",
      status: "inactive",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
