import { request } from "./api"

export const createReview = async (movieId, reviewData, token) => {
  const payload = {
    movieId,
    movie: movieId,
    rating: reviewData.rating,
    comment: reviewData.comment,
    content: reviewData.comment,
  }

  return await request("/reviews", "POST", payload, token)
}

export const deleteReview = async (reviewId, token) => {
  return await request(`/reviews/${reviewId}`, "DELETE", null, token)
}

export const getReviewsByMovie = async (movieId) => {
  return await request(`/reviews/movie/${movieId}`)
}