import type { NextApiRequest, NextApiResponse } from "next";

// 🔁 Replace this with your actual DB logic
const deleteUserById = async (id: string) => {
  // Example with Prisma:
  // return await prisma.user.delete({ where: { id } });

  console.log("Deleting user with ID:", id); // for debug
  return true; // simulate success
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const result = await deleteUserById(id);

    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
