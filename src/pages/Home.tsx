import menu from '../components/menu'
import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <ul>
      <div className="flex justify-center">
        {menu
          .filter((m) => m.href !== '/')
          .map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="block bg-gray-600 hover:bg-gray-500 text-white p-4 m-2 focus:outline-none focus:ring focus:ring-gray-300 transition ease duration-300 text-center rounded-md"
            >
              {item.title}
            </Link>
          ))}
      </div>
    </ul>
  )
}

export default Home
