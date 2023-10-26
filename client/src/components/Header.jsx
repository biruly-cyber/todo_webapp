import React from 'react'
import {Link} from "react-router-dom"

function Header() {
  return (
    <nav className='header flex w-full h-screen bg-red-600'>
      <div>
        <h2>Todo app </h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>profile</Link>
        <Link to={"/login"}>Login</Link>
      </article>
    </nav>
  )
}

export default Header