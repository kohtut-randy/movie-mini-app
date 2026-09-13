import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/mockdata";
import type { Movie } from "@/lib/types";
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Movie | void>,
) {
  const { id } = req.query;

  if (req.method === "GET") {
    const movie = db.getMovieById(id as string);
    if (movie) {
      return res.status(200).json(movie);
    } else {
      return res.status(404).end();
    }
  }
  if (req.method == "PUT") {
    const { title, description, price, genre, releaseYear } = req.body;
    const movie = db.updateMovie(id as string, {
      title,
      description: description || "",
      price: Number(price),
      genre,
      releaseYear: Number(releaseYear) || new Date().getFullYear(),
    });

    if (movie) {
      return res.status(200).json(movie);
    } else {
      return res.status(404).end();
    }
  }

  if (req.method === "DELETE") {
    const movie = db.deleteMovie(id as string);
    if (movie) {
      return res.status(200).end();
    } else {
      return res.status(404).end();
    }
  }
}
