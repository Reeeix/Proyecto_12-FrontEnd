import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import "./NavBar.css"

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🎬 MyMovies</Link>
      </div>
      <div className="navbar-links">
        <Link to="/movies">Movies</Link>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>) : 
          (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
            )}
      </div>
    </nav>
  )
}

export default Navbar