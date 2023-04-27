// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const userData = [
    { id: 0, name: "junsu", gender: "male" },
    { id: 1, name: "suhyun", gender: "female" },
  ];

  res.status(200).json(userData);
}
