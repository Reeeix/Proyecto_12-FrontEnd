import "./MovieDetailInfo.css"

const MovieDetailInfo = ({ movie }) => {
  return (
    <div className="movie-detail-info">
      <img src={movie.poster} alt={movie.title} className="movie-detail-poster" />
      <div className="movie-detail-text">
        <h1 className="movie-detail-title">{movie.title}</h1>
        <p><strong>Year:</strong> {movie.year}</p>
        <p><strong>Genre:</strong> {movie.genre}</p>
      </div>
    </div>
  )
}

export default MovieDetailInfo