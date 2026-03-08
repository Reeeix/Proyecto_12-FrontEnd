import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext.jsx"
import "./Register.css"

const Register = () => {
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await register({
        name,
        email,
        password,
        avatar: avatarUrl,
        avatarUrl,
      })

      setName("")
      setEmail("")
      setPassword("")
      setAvatarUrl("")
      navigate("/")
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="register-page">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input 
          autoComplete="name"
          id="name"
          name="name"
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required 
        />

        <label htmlFor="email">Email:</label>
        <input 
          autoComplete="email"
          id="email"
          name="email"
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
        />

        <label htmlFor="password">Password:</label>
        <input 
          autoComplete="new-password"
          id="password"
          name="password"
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />

        <label htmlFor="avatar">Avatar URL (optional):</label>
        <input
          id="avatar"
          name="avatar"
          type="url"
          placeholder="https://..."
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />

        {error && <p className="error">{error}</p>}
        <button type="submit">Create Account</button>
      </form>
    </div>
  )
}

export default Register