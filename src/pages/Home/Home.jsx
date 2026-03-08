import "./Home.css"
import { useEffect, useState } from "react"
import { getMovies } from "../../services/movieService"
import MoviesList from "../../components/MovieComponents/MoviesList/MoviesList"
import Loader from "../../components/MovieComponents/Loader/Loader"
import ErrorMessage from "../../components/MovieComponents/ErrorMessage/ErrorMessage"

const Home = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const data = await getMovies()
        setMovies(data.slice(0, 12))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [])

  return (
    <div className="home-page">
      <h1>Featured Movies</h1>
      {loading ? <Loader message="Loading movies..." /> :
       error ? <ErrorMessage message={error} /> :
       <MoviesList movies={movies} />}
    </div>
  )
}

export default Home