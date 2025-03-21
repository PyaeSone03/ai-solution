import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { id, count } = req.query;

    // 👉 Return counts for dashboard
    if (count === "true") {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfYear = new Date(now.getFullYear(), 0, 1);

      const [total, thisMonth, thisYear] = await Promise.all([
        prisma.inquiry.count(),
        prisma.inquiry.count({
          where: {
            createdAt: {
              gte: startOfMonth,
              lte: now,
            },
          },
        }),
        prisma.inquiry.count({
          where: {
            createdAt: {
              gte: startOfYear,
              lte: now,
            },
          },
        }),
      ]);

      return res.status(200).json({
        total,
        thisMonth,
        thisYear,
      });
    }

    // 👉 Return single inquiry by ID
    if (id) {
      const inquiry = await prisma.inquiry.findUnique({
        where: { id: String(id) },
      });

      if (!inquiry) {
        return res.status(404).json({ error: "Inquiry not found" });
      }

      return res.status(200).json({ inquiry });
    }

    // 👉 Return all inquiries
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
    console.error("❌ Error in inquiries API:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
