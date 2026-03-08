import { useContext, useState } from "react"
import ReviewCard from "../ReviewCard/ReviewCard"
import { deleteReview } from "../../../services/reviewsService"
import { AuthContext } from "../../../context/AuthContext.jsx"
import "./ReviewsList.css"

const ReviewsList = ({ reviews, onReviewDeleted }) => {
  const { user, token } = useContext(AuthContext)
  const [deletingId, setDeletingId] = useState(null)

  if (!reviews || reviews.length === 0) return <p>No reviews yet.</p>

  const isOwnReview = (review) => {
    const currentUserId = String(user?._id || user?.id || "")
    const reviewUserId = String(
      review?.user?._id || review?.user?.id || review?.userId || review?.user || ""
    )

    if (currentUserId && reviewUserId && currentUserId === reviewUserId) return true

    const currentEmail = user?.email
    const reviewEmail = review?.user?.email || review?.email
    if (currentEmail && reviewEmail && currentEmail === reviewEmail) return true

    const currentName = (user?.name || user?.username || "").trim().toLowerCase()
    const reviewName = (
      review?.user?.name ||
      review?.user?.username ||
      review?.userName ||
      review?.username ||
      ""
    )
      .trim()
      .toLowerCase()

    return Boolean(currentName && reviewName && currentName === reviewName)
  }

  const handleDelete = async (reviewId) => {
    if (!reviewId) return

    try {
      setDeletingId(reviewId)
      await deleteReview(reviewId, token)
      onReviewDeleted?.(reviewId)
    } catch (err) {
      alert(err.message || "Could not delete the review")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="reviews-section">
      <h2>Reviews</h2>
      <div className="reviews-list">
        {reviews.map(review => (
          <ReviewCard
            key={review._id || review.id}
            review={review}
            canDelete={isOwnReview(review)}
            deleting={deletingId === (review._id || review.id)}
            onDelete={() => handleDelete(review._id || review.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default ReviewsList