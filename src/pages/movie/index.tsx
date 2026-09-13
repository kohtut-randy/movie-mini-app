import { RefObject, useEffect, useRef, useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const divRef = useRef<HTMLDivElement | null>(null);
  const divObj = divRef.current;

  const mounted = useRef(false);

  if (divRef.current) {
    console.log("DivRef ", divRef.current);
    if (divObj && divObj.style) {
      divObj.style.color = "red";
      divObj.innerText = "red";
    }
  }

  const fetchMovieList = async () => {
    setLoading(true);
    setError(null);
    const query = new URLSearchParams(filters as any).toString();

    try {
      const response = await fetch(`/api/movie?${query}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      setmovies(data);
    } catch (error: any) {
      console.error(error);
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filters) {
      fetchMovieList();
    }
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
      {loading && <div className="text-blue-500 bg-blue-100">Loading...</div>}
      {error && <div className="text-red-500">Error: {String(error)}</div>}
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

        {/* <div ref={divRef}>I am Div</div> */}
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
