import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import NavBar from "./components/global/header/navBar";
import Account from "./pages/account";
import Footer from "./components/global/footer";
import MovieDetails from "./components/pages/home/movieDetails";
import ProtectedRoute from "./components/global/protectedRoute";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
