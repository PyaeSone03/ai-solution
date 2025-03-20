import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        country: true,
        company: true,
        title: true,
        job: true,
        message: true,
        createdAt: true,
      },
    });
    return res.status(200).json({ inquiries });
  } catch (error) {
    console.error("❌ Error fetching inquiries:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}