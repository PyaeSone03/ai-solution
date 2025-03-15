import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, address, country, company, title, job, message } = req.body;

    if (!name || !email || !address || !country || !company || !title || !job || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check for duplicate email
    const existingInquiry = await prisma.inquiry.findUnique({ where: { email } });
    if (existingInquiry) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const newInquiry = await prisma.inquiry.create({
      data: { name, email, address, country, company, title, job, message },
    });

    return res.status(201).json(newInquiry);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
