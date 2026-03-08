import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext.jsx"
import "./UserProfile.css"
import UserInfo from "../../components/UserComponents/UserInfo/UserInfo"
import UserReviews from "../../components/UserComponents/UserReviews/UserReviews"
import MoviesList from "../../components/MovieComponents/MoviesList/MoviesList"
import Loader from "../../components/MovieComponents/Loader/Loader"
import ErrorMessage from "../../components/MovieComponents/ErrorMessage/ErrorMessage"

const UserProfile = () => {
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reviews, setReviews] = useState([])
  const [watchlist, setWatchlist] = useState([])

  useEffect(() => {
    if (!user) return
    const fetchUserReviews = async () => {
      try {
        setLoading(true)

        const normalizedReviews = (user.reviews || []).map((review) => ({
          ...review,
          user:
            review?.user && typeof review.user === "object"
              ? review.user
              : { name: user.name },
        }))

        const normalizedWatchlist = (user.watchlist || [])
          .filter((item) => item && typeof item === "object")
          .map((item) => ({
            ...item,
            _id: item._id || item.id,
          }))

        setReviews(normalizedReviews)
        setWatchlist(normalizedWatchlist)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUserReviews()
  }, [user])

  if (!user) return <p>You need to sign in to view your profile.</p>
  if (loading) return <Loader message="Loading profile..." />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="user-profile-page">
      <UserInfo user={user} />
      <UserReviews reviews={reviews} />

      <div className="user-watchlist-section">
        <h2>My Watchlist</h2>
        {watchlist.length === 0 ? (
          <p>You do not have any saved movies in your watchlist.</p>
        ) : (
          <MoviesList movies={watchlist} />
        )}
      </div>
    </div>
  )
}

export default UserProfile