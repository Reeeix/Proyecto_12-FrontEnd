import "./ReviewCard.css"

const ReviewCard = ({ review, canDelete = false, onDelete, deleting = false, contextLabel }) => {
  const userName =
    review?.user?.name ||
    review?.user?.username ||
    review?.userName ||
    review?.username ||
    "User"
  const rating = review?.rating ?? "-"
  const comment = review?.comment || "No comment"

  return (
    <div className="review-card">
      {contextLabel ? <p className="review-context">{contextLabel}</p> : null}
      <p className="review-user"><strong>{userName}</strong></p>
      <p className="review-rating">⭐ {rating}</p>
      <p className="review-comment">{comment}</p>
      {canDelete ? (
        <button
          className="review-delete-button"
          type="button"
          onClick={onDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete review"}
        </button>
      ) : null}
    </div>
  )
}

export default ReviewCard