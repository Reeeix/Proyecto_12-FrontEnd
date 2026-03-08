import { useParams } from "react-router-dom"
import { useContext, useEffect, useMemo, useState } from "react"
import { getMovieById } from "../../services/movieService"
import Loader from "../../components/MovieComponents/Loader/Loader"
import ErrorMessage from "../../components/MovieComponents/ErrorMessage/ErrorMessage"
import MovieDetailInfo from "../../components/MovieComponents/MovieDetailInfo/MovieDetailInfo"
import ReviewsList from "../../components/MovieComponents/ReviewsList/ReviewsList"
import ReviewForm from "../../components/MovieComponents/ReviewForm/ReviewForm"
import "./MovieDetail.css"
import WatchlistButton from "../../components/WatchlistComponents/WatchlistButton"
import { AuthContext } from "../../context/AuthContext.jsx"




const MovieDetail = () => {
  const { id } = useParams()
  const { user } = useContext(AuthContext)
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const initialInWatchlist = useMemo(() => {
    const watchlist = user?.watchlist || []
    return watchlist.some((item) => {
      const itemId = String(item?._id || item?.id || item)
      return itemId === String(id)
    })
  }, [user, id])

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true)
        const data = await getMovieById(id)
        setMovie(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchMovie()
  }, [id])

  if (loading) return <Loader message="Loading movie..." />
  if (error) return <ErrorMessage message={error} />
  if (!movie) return <p>Movie not found</p>

  return (
    <div className="movie-detail-page">
      <MovieDetailInfo movie={movie} />
      <WatchlistButton movieId={movie._id} initialInWatchlist={initialInWatchlist} />
      <ReviewForm 
        movieId={movie._id} 
        onNewReview={(newReview) =>
          setMovie({
            ...movie,
            reviews: [...movie.reviews, newReview]
          })
        }
      />
      <ReviewsList
        reviews={movie.reviews}
        onReviewDeleted={(reviewId) =>
          setMovie({
            ...movie,
            reviews: (movie.reviews || []).filter((review) => review._id !== reviewId),
          })
        }
      />
    </div>
  )
}

export default MovieDetail