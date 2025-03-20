import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const users = await prisma.user.findMany({ include: { role: true } });
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
