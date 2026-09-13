import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Container, Typography, Button, Box, Paper, CircularProgress, Dialog } from '@mui/material'
import { Movie } from '@/lib/types'
import MovieForm from '@/component/MovieForm'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export default function MoviePage() {
  const [open, setOpen] = useState(false)

  const router = useRouter()
  const { id } = router.query

  const fetchMovieDetail = async () => {
    // if (!router.isReady || !id) return;

    const query = `/api/movie/${id}`
    const response = await fetch(query, {
      cache: 'no-store',
    })

    return await response.json()
  }
  const { data: movie } = useQuery<Movie>({ queryKey: [id], queryFn: fetchMovieDetail })

  const queryClient = useQueryClient()
  const invalidateMovieDetails = async () => {
    await queryClient.invalidateQueries({
      queryKey: [id],
    })
  }

  const handleSuccess = async () => {
    setOpen(false)
    await invalidateMovieDetails()
  }

  return (
    <div>
      <Container>
        {movie ? (
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant='h4' gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant='body1' gutterBottom>
              {movie.description}
            </Typography>
            <Typography variant='body1' gutterBottom>
              {movie.genre}
            </Typography>
            <Typography variant='body1' gutterBottom>
              ${movie.price}
            </Typography>
            <Typography variant='body1' gutterBottom>
              Release Year: {movie.releaseYear}
            </Typography>
            <Button variant='contained' color='primary' onClick={() => setOpen(true)}>
              Edit Movie
            </Button>
          </Paper>
        ) : (
          <CircularProgress />
        )}
      </Container>
      <Dialog fullWidth={true} maxWidth='md' open={open} onClose={() => setOpen(false)}>
        <MovieForm mode='edit' id={id as string} data={movie as Movie} onSuccess={handleSuccess} />
      </Dialog>
    </div>
  )
}
