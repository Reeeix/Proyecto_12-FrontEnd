import { useState, useContext } from "react"
import { AuthContext } from "../../../context/AuthContext.jsx"
import { createReview } from "../../../services/reviewsService"
import "./ReviewForm.css"

const ReviewForm = ({ movieId, onNewReview }) => {
  const { user, token } = useContext(AuthContext)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  if (!user) return <p>You need to sign in to leave a review.</p>

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const newReview = await createReview(movieId, { rating, comment }, token)
      onNewReview(newReview)
      setRating(5)
      setComment("")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>Leave your review</h3>
      <label>
        Rating: {rating}/10
        <div className="rating-stars" role="radiogroup" aria-label="Movie rating">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
            <button
              key={star}
              type="button"
              className={`star-button ${star <= rating ? "filled" : ""}`}
              onClick={() => setRating(star)}
              aria-label={`Rate ${star} out of 10`}
              aria-pressed={star <= rating}
            >
              {star <= rating ? "★" : "☆"}
            </button>
          ))}
        </div>
      </label>
      <label>
        Comment:
        <textarea 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
          maxLength={100}
          required
          placeholder="Write your comment..."
        />
      </label>
      {error && <p className="review-error">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Submit Review"}
      </button>
    </form>
  )
}

export default ReviewForm