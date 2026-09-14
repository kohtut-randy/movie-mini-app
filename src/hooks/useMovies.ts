// data fetching and crud

import { Movie } from "@/lib/types";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/router";

export const GET_MOVIE_KEY = "movies-list";

export default function useMovies() {
  const router = useRouter();

  const { id } = router.query;
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
  });
  const fetchMovieList = async () => {
    const query = new URLSearchParams(
      filters as Record<string, any>,
    ).toString();
    try {
      const response = await fetch(`/api/movie?${query}`);
      return await response.json();
    } catch (err) {
      // we need to use type narrowing bc , err object type is set to unknown
      if (err instanceof ReferenceError) {
        throw new Error("Something went wrong when fetching movies: ", err);
      }
    }
  };

  const {
    data: movies,
    isLoading,
    isError,
    refetch,
    ...res
  } = useQuery({
    queryKey: [GET_MOVIE_KEY, filters],
    queryFn: fetchMovieList,
    enabled: !!filters,
  });

  const queryClient = useQueryClient();

  const invalidateMovies = async () => {
    await queryClient.invalidateQueries({
      queryKey: [GET_MOVIE_KEY],
    });
  };
  const fetchMovieDetail = async (id: string) => {
    // if (!router.isReady || !id) return;

    const query = `/api/movie/${id}`;
    const response = await fetch(query, {
      cache: "no-store",
    });

    return await response.json();
  };
  const { data: movieDetails } = useQuery<Movie>({
    queryKey: [id],
    queryFn: () => fetchMovieDetail(id as string),
    enabled: !!id,
  });

  const invalidateMovieDetails = async () => {
    await queryClient.invalidateQueries({
      queryKey: [id],
    });
  };

  const deleteMovie = async (id: string) => {
    if (confirm(`Are u sure u gonna delete this movie - ${id} ? `)) {
      const response = await fetch(`/api/movie/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // await invalidateMovies();
        console.log(`Movie ${id}} is deleted`);
      }
    }
  };
  const deleteMovieMutation = useMutation({
    mutationFn: deleteMovie,
    onSuccess: async () => {
      await invalidateMovies();
    },
  });

  const createMovie = async (movieData: Movie) => {
    const response = await fetch(`/api/movie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    });
    if (!response.ok) {
      throw new Error("Failed to create movie");
    }
    return await response.json();
  };

  const createMovieMutation = useMutation({
    mutationFn: createMovie,
    onSuccess: async () => {
      await invalidateMovies();
    },
  });

  const updateMovie = async (id: string, movieData: Movie) => {
    const response = await fetch(`/api/movie/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    });
    if (!response.ok) {
      throw new Error("Failed to update movie");
    }
    return await response.json();
  };

  const updateMovieMutation = useMutation({
    mutationFn: ({ id, movieData }: { id: string; movieData: Movie }) =>
      updateMovie(id, movieData),
    onSuccess: async () => {
      await invalidateMovieDetails();
    },
  });

  return {
    deleteMovieMutation,
    createMovieMutation,
    updateMovieMutation,
    movies,
    isLoading,
    isError,
    filters,
    setFilters,
    refetchMovies: refetch,
    invalidateMovies,
    movieDetails,
    invalidateMovieDetails,
    ...res,
  };
}
