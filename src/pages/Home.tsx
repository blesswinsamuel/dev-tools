import menu from '../components/menu'
import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <ul>
      {menu.map((item) => (
        <li key={item.href}>
          <Link to={item.href}>{item.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export default Home
