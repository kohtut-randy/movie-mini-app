import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";

interface Movie {
  id: string;
  title: string;
  price: number;
  genre: string;
  releaseYear: number;
  posterUrl: string;
}

export default function MovieCard({
  movie,
  deleteMovie,
}: {
  movie: Movie;
  deleteMovie: (id: string) => void;
}) {
  const router = useRouter();
  return (
    <Card className="h-full flex flex-col min-w-[300px]">
      <CardContent className="flex-1">
        <Typography variant="h6">{movie.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.genre} · {movie.releaseYear}
        </Typography>
        <Typography variant="h6" color="primary" className="mt-2">
          ${movie.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => router.push(`/movie/${movie.id}`)}>
          View
        </Button>
        <Button
          size="small"
          color="error"
          onClick={() => deleteMovie(movie.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
