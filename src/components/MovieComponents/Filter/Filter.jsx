import TitleFilter from "./TitleFilter.jsx"
import GenreFilter from "./GenreFilter"

const Filters = ({ filters, setFilters, genres, fetchMovies }) => {

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    fetchMovies(newFilters)
  }

  return (
    <div className="filters">
      <TitleFilter filters={filters} setFilters={handleFilterChange} />
      <GenreFilter filters={filters} setFilters={handleFilterChange} genres={genres} />
    </div>
  )
}

export default Filters