import React, { useContext } from 'react'
import {Link} from "react-router-dom"
import { Context } from '../index'

function Header() {
  const {isAuthenticated} = useContext(Context)
  
  
  return (
    <nav className='flex w-full '>
      <div>
        <h2>Todo app </h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>profile</Link>

        {
         isAuthenticated?  <button >Logout</button>:<Link to={"/login"}>Login</Link>
        }
       
      </article>
    </nav>
  )
}

export default Header