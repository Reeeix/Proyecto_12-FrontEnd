import { useEffect, useState } from "react"
import { getWatchlist } from "../../services/watchlistService"
import MoviesList from "../../components/MovieComponents/MoviesList/MoviesList"
import Loader from "../../components/MovieComponents/Loader/Loader"
import ErrorMessage from "../../components/MovieComponents/ErrorMessage/ErrorMessage"
import "./Watchlist.css"

const Watchlist = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchWatchlist = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getWatchlist()
      setMovies(data.watchlist || data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWatchlist()
  }, [])

  if (loading) return <Loader message="Loading watchlist..." />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="watchlist-page">
      <h1>Mi Watchlist</h1>
      {movies.length === 0 ? 
      ( <p>You do not have any saved movies in your watchlist.</p> )
      : ( <MoviesList movies={movies}/> )}
    </div>
  )
}

export default Watchlist