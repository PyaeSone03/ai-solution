import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.role.createMany({
    data: [
      { id: "admin-id", name: "admin" },
      { id: "staff-id", name: "staff" },
    ],
    skipDuplicates: true,
  });

  const hashedPassword = await bcrypt.hash("user1234", 10);

  await prisma.user.upsert({
    where: { email: "user@gmail.com" },
    update: {},
    create: {
      name: "user",
      email: "user@gmail.com",
      password: hashedPassword,
      roleId: "admin-id",
    },
  });

  console.log("✅ Database seeding completed.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    prisma.$disconnect();
    process.exit(1);
  });
