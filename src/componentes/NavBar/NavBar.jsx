import React from 'react'
import './NavBar.css'
import CartWidget from '../CartWidget/CartWidget'
import { Link, NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <header>
      <Link to="/">
        <img  className='logo' src={"./img/logo.png"} alt="Logo Trendisdead" />
      </Link>

        <nav>
            <ul>
                <li>
                  <NavLink to="/"><span>Home</span> </NavLink>
                  <NavLink to="/categoria/torso"> <span>Torsos</span> </NavLink>
                  <NavLink to="/categoria/piernas"> <span>Piernas</span></NavLink> 
                </li>
            </ul>
        </nav>

        <CartWidget/>

    </header>
  )
}

export default NavBar