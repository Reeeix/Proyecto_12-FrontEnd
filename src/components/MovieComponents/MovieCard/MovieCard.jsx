import { useNavigate } from "react-router-dom"
import "./MovieCard.css"

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/movies/${movie._id}`)
  }

  return (
    <div className="movie-card" onClick={handleClick}>
      <img src={movie.poster} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-year">{movie.year}</p>
        <p className="movie-genre">{movie.genre}</p>
      </div>
    </div>
  )
}

export default MovieCard