import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Context, server } from "../index";


function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation  = useNavigate(); // Initialize useHistory

//   const navigation = useNavigation();
    const {isAuthenticated, setIsAuthenticated} = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${server}/users/login `,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Handle the response
      console.log("Request was successful:", data);
      setIsAuthenticated(true)
        
      if(isAuthenticated){
         // Check for successful login and navigate to the home page
        navigation('/'); // Redirect to the home page
      }
      
     

    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Handle conflict-specific logic here
        console.error("Conflict detected. Please resolve the conflict.");
      } else {
        // Handle other errors
        console.error("An error occurred:", error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
  <section className="bg-white p-6 rounded-lg shadow-md">
    <form onSubmit={submitHandler} className="text-center">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded-md mb-3"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded-md mb-3"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none mb-3"
      >
        Login
      </button>
      <h4>Or</h4>
      <Link to="/register" className="text-blue-500 hover:underline">
        Sign Up
      </Link>
    </form>
  </section>
</div>

  );
}

export default Signin;
