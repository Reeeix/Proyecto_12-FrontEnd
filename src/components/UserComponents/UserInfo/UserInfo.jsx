import { useState } from "react"
import "./UserInfo.css"

const UserInfo = ({ user }) => {
  const [avatarError, setAvatarError] = useState(false)
  const avatar = user?.avatar || user?.avatarUrl || user?.profileImage || user?.image || user?.photo
  const displayName = user?.name || user?.username || "User"
  const initial = displayName.charAt(0).toUpperCase()

  return (
    <div className="user-info">
      {avatar && !avatarError ? (
        <img
          className="user-avatar"
          src={avatar}
          alt={`${displayName} avatar`}
          onError={() => setAvatarError(true)}
        />
      ) : (
        <div className="user-avatar user-avatar-fallback">{initial}</div>
      )}
      <div>
        <h1>{displayName}</h1>
        <p>{user?.email || ""}</p>
      </div>
    </div>
  )
}

export default UserInfo