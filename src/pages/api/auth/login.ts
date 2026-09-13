import type { NextApiRequest, NextApiResponse } from "next";

import { users } from "@/lib/mockdata";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, password } = req.body;

  const user = users.find(
    (user) => user.email === email && user.password === password,
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Never send the password back to the client.
  const safeUser = { id: user.id, email: user.email, role: user.role };
  return res.status(200).json({ message: "Login successful", user: safeUser });
}
