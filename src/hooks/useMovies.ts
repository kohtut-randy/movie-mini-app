// data fetching and crud

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export const GET_MOVIE_KEY = 'movies-list'

export default function useMovies() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: '',
  })
  const fetchMovieList = async () => {
    const query = new URLSearchParams(filters as Record<string, any>).toString()
    try {
      const response = await fetch(`/api/movie?${query}`)
      return await response.json()
    } catch (err) {
      // we need to use type narrowing bc , err object type is set to unknown
      if (err instanceof ReferenceError) {
        throw new Error('Something went wrong when fetching movies: ', err)
      }
    }
  }

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
  })

  const queryClient = useQueryClient()

  const invalidateMovies = async () => {
    await queryClient.invalidateQueries({
      queryKey: [GET_MOVIE_KEY],
    })
  }

  const deleteMovie = async (id: string) => {
    if (confirm(`Are u sure u gonna delete this movie - ${id} ? `)) {
      const response = await fetch(`/api/movie/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await invalidateMovies()
        console.log(`Movie ${id}} is deleted`)
      }
    }
  }

  return {
    deleteMovie,
    movies,
    isLoading,
    isError,
    filters,
    setFilters,
    refetchMovies: refetch,
    invalidateMovies,
    ...res,
  }
}
