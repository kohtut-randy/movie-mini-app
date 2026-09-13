import { useEffect, useState } from "react";
import MovieCard from "@/component/MovieCard";
import MovieForm from "@/component/MovieForm";
import { Dialog, Button, Box, TextField } from "@mui/material";

export default function Movies() {
  const [open, setOpen] = useState(false);
  const [movies, setmovies] = useState([]);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
  });
  const fetchMovieList = async () => {
    const query = new URLSearchParams(filters as any).toString();
    const response = await fetch(`/api/movie?${query}`, {
      cache: "no-store",
    });
    const data = await response.json();
    setmovies(data);
  };

  useEffect(() => {
    fetchMovieList();
  }, [filters]);

  const DeleteMovie = async (id: string) => {
    const query = new URLSearchParams({ id }).toString();
    const response = await fetch(`/api/movie/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchMovieList();
    }
  };

  const isNextDisabled = movies.length < filters.limit;
  const hundleSuccess = () => {
    setOpen(false);
    fetchMovieList();
  };

  return (
    <Box sx={{ p: 4, gap: 10 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <TextField
          type="text"
          placeholder="Search..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="mb-4 px-4 py-2 border rounded bg-white text-black"
        />
        <Button variant="contained" onClick={() => setOpen(true)}>
          Create Movie
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {movies.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} deleteMovie={DeleteMovie} />
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 8 }}>
        <Button
          onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
          disabled={filters.page === 1}
          variant="contained"
        >
          previous page
        </Button>
        <Button
          onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
          disabled={isNextDisabled}
          variant="contained"
        >
          next page
        </Button>
      </Box>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={open}
        onClose={() => setOpen(false)}
      >
        <MovieForm mode="create" onSuccess={hundleSuccess} />
      </Dialog>
    </Box>
  );
}
