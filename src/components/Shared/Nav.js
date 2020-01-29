import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => (
  <nav>
    <NavLink to='/'>Home</NavLink>
    <NavLink to='/movies'>Movies</NavLink>
    <NavLink to='/create-movie'>Create Movie</NavLink>
  </nav>
)

export default Nav
