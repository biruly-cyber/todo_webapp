import React from 'react'
import {Link} from "react-router-dom"
function Signin() {
  return (
    <div>
        <section>
            <form >
                <input type="email" placeholder='Email' />
                <input type="password" placeholder='Password' />
                <button type='submit'>Login </button>
                <h4>Or</h4>
                <Link to={"/register"}>Sign Up</Link>
            </form>
        </section>
    </div>
  )
}

export default Signin