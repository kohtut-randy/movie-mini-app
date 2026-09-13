import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/mockdata";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): void {
  if (req.method === "GET") {
    const { page, limit, search } = req.query;
    const movies = db.getMovies({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      search: search ? String(search) : undefined,
    });
    res.status(200).json(movies.data);
    return;
  }

  if (req.method === "POST") {
    const { title, description, price, genre, releaseYear } = req.body;
    const movie = db.addMovie({
      title,
      description: description || "",
      price: Number(price),
      genre,
      releaseYear: Number(releaseYear) || new Date().getFullYear(),
    });

    return res.status(201).json(movie);
  }
}
