import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  let user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    return res.status(400).json({ error: "Email already in use" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  user = await prisma.user.create({
    data: { name: name || "Default User", email, password: hashedPassword, role: { connect: { id: "default-role-id" } } },
  });

  res.status(201).json({ message: "User created successfully", user });
}
