import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../index";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation  = useNavigate();

  const {isAuthenticated, setIsAuthenticated} = useContext(Context);

  //submmit handler
  const submitHandle = async (e) => {
    e.preventDefault();

    console.log(name, email, password);

    try {
      const { data } = await axios.post(
        `${server}/users/register `,
        {
          name,
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
      setIsAuthenticated(true);

      //redirect to home page
      if(isAuthenticated) return  navigation('/'); // Redirect to the home page

    } catch (error) {
      setIsAuthenticated(false);
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
    <div>
      <section>
        <form onSubmit={submitHandle}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
          <button type="submit">Sign up </button>
          <h4>Or</h4>
          <Link to={"/login"}>Sign in</Link>
        </form>
      </section>
    </div>
  );
}

export default Signup;
