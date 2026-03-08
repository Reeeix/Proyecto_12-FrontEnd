import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Movies from "./pages/Movies/Movies"
import MovieDetail from "./pages/MovieDetail/MovieDetail"
import UserProfile from "./pages/UserProfile/UserProfile"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import NotFound from "./pages/NotFound/NotFound"
import Navbar from "./components/NavBar/NavBar"


function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/movies" element={<Movies/>} />
      <Route path="/movies/:id" element={<MovieDetail/>}/>
      <Route path="/profile" element={ 
        <ProtectedRoute>
        <UserProfile />
        </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound/>} />
    </Routes>
    </>
  )
}

export default App