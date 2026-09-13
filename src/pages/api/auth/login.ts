import type { NextApiRequest, NextApiResponse } from "next";

import { users } from "@/lib/mockdata";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const user = users.find(
      (user) => user.email === email && user.password === password,
    );
    if (user) {
      return res
        .status(200)
        .json({
          message: "Login successful",
          data: { profile: { email: user.email } },
        });
    } else {
      return res
        .status(401)
        .json({ message: "Invalid credentials", data: null });
    }
  } else {
    return res.status(405).end();
  }
}
