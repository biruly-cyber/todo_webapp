import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { server } from "../index";


function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation  = useNavigate(); // Initialize useHistory

//   const navigation = useNavigation();

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

       // Check for successful login and navigate to the home page
       if (data && data.success) {
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
    <div>
      <section>
        <form onSubmit={submitHandler}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button type="submit">Login </button>
          <h4>Or</h4>
          <Link to={"/register"}>Sign Up</Link>
        </form>
      </section>
    </div>
  );
}

export default Signin;
