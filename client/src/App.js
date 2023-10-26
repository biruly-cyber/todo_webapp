import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css';
import Home from "./pages/Home";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Toaster from "react-hot-toast"


function App() {
  return <Router>
    <Header/>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<Signin/>} />
        <Route path="/register" element={<Signup/>} />
    </Routes>
    <Toaster/>
  </Router>
  
}

export default App;
