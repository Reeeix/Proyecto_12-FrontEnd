const GenreFilter = ({ filters, setFilters, genres }) => {

  const handleGenreClick = (genre) => {
    const newFilters = { ...filters, genre: filters.genre === genre ? "" : genre }
    setFilters(newFilters) 
  }

  return (
    <div className="genres">
      {genres.map(g => (
        <button
          key={g}
          onClick={() => handleGenreClick(g)}
          className={filters.genre === g ? "active" : ""}
        >
          {g}
        </button>
      ))}
    </div>
  )
}

export default GenreFilter