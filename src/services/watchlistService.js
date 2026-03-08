import { request } from "./api"

export const getWatchlist = async () => {
  return await request("/users/watchlist")
}

export const addToWatchlist = async (movieId) => {
  return await request(`/users/watchlist/${movieId}`, "POST")
}

export const removeFromWatchlist = async (movieId) => {
  return await request(`/users/watchlist/${movieId}`, "DELETE")
}