import { useEffect, useState } from "react"
import { getMovies } from "../../services/movieService"
import Filters from "../../components/MovieComponents/Filter/Filter"
import MoviesList from "../../components/MovieComponents/MoviesList/MoviesList"
import Loader from "../../components/MovieComponents/Loader/Loader"
import ErrorMessage from "../../components/MovieComponents/ErrorMessage/ErrorMessage"
import "./Movies.css"

const genres = [
  "Drama", "Crime", "Action", "SciFi", "Western", "Thriller",
  "Comedy", "Fantasy", "Romance", "Animation", "Adventure", "War", "Horror"
]

const Movies = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({ title: "", genre: "" })

  const fetchMovies = async (appliedFilters = filters) => {
    try {
      setLoading(true)
      const data = await getMovies(appliedFilters)
      setMovies(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <div className="movies-page">
      <Filters filters={filters} setFilters={setFilters} genres={genres} fetchMovies={fetchMovies} />
      {loading ? (
        <Loader message="Loading movies..." />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <MoviesList movies={movies} />
      )}
    </div>
  )
}

export default Movies