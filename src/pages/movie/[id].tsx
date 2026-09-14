import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  CircularProgress,
  Dialog,
} from "@mui/material";
import { Movie } from "@/lib/types";
import MovieForm from "@/component/MovieForm";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useMovies from "@/hooks/useMovies";
import useAuth from "@/hooks/useAuth";

export default function MoviePage() {
  const { profileData } = useAuth();
  const isAdmin = profileData?.role === "admin";
  const { updateMovieMutation, movieDetails, invalidateMovieDetails } =
    useMovies();
  const [open, setOpen] = useState(false);

  const handleSuccess = async () => {
    setOpen(false);
    await invalidateMovieDetails();
  };

  return (
    <div>
      <Container>
        {movieDetails ? (
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
              {movieDetails.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {movieDetails.description}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {movieDetails.genre}
            </Typography>
            <Typography variant="body1" gutterBottom>
              ${movieDetails.price}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Release Year: {movieDetails.releaseYear}
            </Typography>
            {isAdmin && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
              >
                Edit Movie
              </Button>
            )}
          </Paper>
        ) : (
          <CircularProgress />
        )}
      </Container>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={open}
        onClose={() => setOpen(false)}
      >
        <MovieForm
          mode="edit"
          id={movieDetails?.id as string}
          data={movieDetails as Movie}
          onSuccess={handleSuccess}
          updateMovieMutation={updateMovieMutation}
        />
      </Dialog>
    </div>
  );
}
