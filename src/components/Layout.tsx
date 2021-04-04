import React from 'react'
import { NavLink } from 'react-router-dom'
import menu from './menu'

export default function Layout({ children }) {
  return (
    <div>
      <nav className="w-full bg-primary">
        <ul>
          {menu.map((item) => (
            <li key={item.href} className="inline-block">
              <NavLink
                exact
                to={item.href}
                className={
                  'block p-4 transition duration-200 ease text-black hover:bg-white'
                }
                activeClassName="bg-white"
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="relative m-4">{children}</div>
    </div>
  )
}
