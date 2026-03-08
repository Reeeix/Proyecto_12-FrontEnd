import { request } from "./api"


export const getMovies = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString()
  const endpoint = query ? `/movies?${query}` : "/movies"
  return await request(endpoint)
}


export const getMovieById = async (id) => {
  return await request(`/movies/${id}`)
}