import { useContext, useEffect, useState } from "react"
import ReviewCard from "../../MovieComponents/ReviewCard/ReviewCard"
import { deleteReview } from "../../../services/reviewsService"
import { AuthContext } from "../../../context/AuthContext.jsx"
import "./UserReviews.css"

const UserReviews = ({ reviews }) => {
  const { token } = useContext(AuthContext)
  const [items, setItems] = useState(reviews || [])
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    setItems(reviews || [])
  }, [reviews])

  const handleDelete = async (reviewId) => {
    if (!reviewId) return

    try {
      setDeletingId(reviewId)
      await deleteReview(reviewId, token)
      setItems((prev) => prev.filter((review) => (review._id || review.id) !== reviewId))
    } catch (err) {
      alert(err.message || "Could not delete the review")
    } finally {
      setDeletingId(null)
    }
  }

  if (!items || items.length === 0) return <p>You have not written any reviews yet.</p>

  const getMovieLabel = (review) => {
    const movieTitle =
      review?.movie?.title ||
      review?.movieTitle ||
      review?.title ||
      ""

    return movieTitle ? `Movie: ${movieTitle}` : null
  }

  return (
    <div className="user-reviews-section">
      <h2>My Reviews</h2>
      {items.map(review => (
        <ReviewCard
          key={review._id || review.id}
          review={review}
          contextLabel={getMovieLabel(review)}
          canDelete={true}
          deleting={deletingId === (review._id || review.id)}
          onDelete={() => handleDelete(review._id || review.id)}
        />
      ))}
    </div>
  )
}

export default UserReviews