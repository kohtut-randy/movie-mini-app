import { useState } from 'react'
import MovieCard from '@/component/MovieCard'
import MovieForm from '@/component/MovieForm'
import { Dialog, Button, Box, TextField } from '@mui/material'
import useMovies from '@/hooks/useMovies'

export default function Movies() {
  const [open, setOpen] = useState(false)

  const { movies, isError, isLoading, deleteMovie, invalidateMovies, error, filters, setFilters } = useMovies()

  const isNextDisabled = !movies?.length

  async function hundleSuccess() {
    setOpen(false)
    await invalidateMovies()
  }

  return (
    <Box sx={{ p: 4, gap: 10 }}>
      {isLoading && <div className='text-blue-500 bg-blue-100'>Loading...</div>}
      {isError && <div className='text-red-500'>Error: {String(error)}</div>}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <TextField
          type='text'
          placeholder='Search...'
          value={filters.search}
          onChange={e => setFilters({ ...filters, search: e.target.value })}
          className='mb-4 px-4 py-2 border rounded bg-white text-black'
        />
        <Button variant='contained' onClick={() => setOpen(true)}>
          Create Movie
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {movies?.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} deleteMovie={deleteMovie} />
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 8 }}>
        <Button onClick={() => setFilters({ ...filters, page: filters.page - 1 })} disabled={filters.page === 1} variant='contained'>
          previous page
        </Button>
        <Button onClick={() => setFilters({ ...filters, page: filters.page + 1 })} disabled={isNextDisabled} variant='contained'>
          next page
        </Button>

        {/* <div ref={divRef}>I am Div</div> */}
      </Box>
      <Dialog fullWidth={true} maxWidth='md' open={open} onClose={() => setOpen(false)}>
        <MovieForm mode='create' onSuccess={hundleSuccess} />
      </Dialog>
    </Box>
  )
}
