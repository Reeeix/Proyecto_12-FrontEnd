const TitleFilter = ({ filters, setFilters }) => {
  const handleTitleChange = (e) => {
    const newFilters = { ...filters, title: e.target.value }
    setFilters(newFilters) 
  }

  return (
    <input
      type="text"
      placeholder="Search by title"
      value={filters.title}
      onChange={handleTitleChange}
      className="title-input"
    />
  )
}

export default TitleFilter