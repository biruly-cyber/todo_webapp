import {BrowserRouter as Router, Routes, Route , Navigate} from "react-router-dom"
import './App.css';
import Home from "./pages/Home";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from ".";
import Khata from "./pages/Khata";
import Order from "./pages/Order";


function App() {
 const {user, setUser, setIsAuthenticated, setLoading} = useContext(Context)
  useEffect(()=>{
    setLoading(true);
    axios.get(`${server}/users/me`,{
      withCredentials:true
    }).then(res=>{
      console.log(res.data.user)
      setUser(res.data.user)
      setIsAuthenticated(true)
      setLoading(false)
    }).catch((error)=>{
      console.log(error)
      setIsAuthenticated(!true)
      setLoading(false)
    })
  },[])
  return (<Router>
    <Header/>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/khata" element={<Khata/>} />
        <Route path="/order" element={<Order/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<Signin/>} />
        <Route path="/register" element={<Signup/>} />
    </Routes>
    {/* <Toaster/> */}
  </Router>
  )
}

export default App;
