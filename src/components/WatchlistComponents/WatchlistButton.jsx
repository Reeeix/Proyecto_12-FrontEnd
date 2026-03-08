import { useState, useContext, useEffect } from "react"
import { addToWatchlist, removeFromWatchlist } from "../../services/watchlistService"
import "./WatchlistButton.css"
import { AuthContext } from "../../context/AuthContext"

const WatchlistButton = ({ movieId, initialInWatchlist }) => {
  const [inWatchlist, setInWatchlist] = useState(initialInWatchlist)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setInWatchlist(initialInWatchlist)
  }, [initialInWatchlist])

  const handleClick = async () => {
    try {
      setLoading(true)

      if (inWatchlist) {
        await removeFromWatchlist(movieId)
        setInWatchlist(false)
      } else {
        await addToWatchlist(movieId)
        setInWatchlist(true)
      }

    } catch (error) {
      const message = String(error?.message || "").toLowerCase()
      if (message.includes("already in watchlist")) {
        setInWatchlist(true)
      }
      console.error("Error updating watchlist:", error)
    } finally {
      setLoading(false)
    }
  }

     const { user } = useContext(AuthContext)

    if (!user) return null

  return (
    <button
      className="watchlist-button"
      onClick={handleClick}
      disabled={loading}
    >
      {loading
        ? "Updating..."
        : inWatchlist
          ? "✓ Remove from Watchlist"
          : "+ Add to Watchlist"}
    </button>
  )
}

export default WatchlistButton