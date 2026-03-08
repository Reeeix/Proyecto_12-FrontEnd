import MovieCard from "../MovieCard/MovieCard"
import "./MoviesList.css"

const MoviesList = ({ movies }) => {
  if (!movies || movies.length === 0) return <p>No movies found</p>

  return (
    <div className="movies-list">
      {movies.map(movie => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </div>
  )
}

export default MoviesList