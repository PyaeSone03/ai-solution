import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id, name, email, password, roleId } = req.body;

  try {
    const data: any = { name, email, roleId };
    
    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    await prisma.user.update({
      where: { id },
      data,
    });

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
