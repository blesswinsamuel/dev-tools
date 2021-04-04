import React from 'react'
import { NavLink } from 'react-router-dom'
import menu from './menu'

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div>
      <nav className="bg-gray-800 text-white">
        <div className="container mx-auto flex justify-center py-2 px-4">
          {menu.map((item) => (
            <div key={item.href} className="flex items-center">
              <NavLink
                exact
                to={item.href}
                className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 mx-1 rounded-md text-sm font-medium focus:outline-none focus:ring focus:ring-gray-300 transition ease duration-300"
                activeClassName="bg-gray-900 text-white hover:bg-gray-900"
              >
                {item.title}
              </NavLink>
            </div>
          ))}
        </div>
      </nav>
      <div className="relative m-4">{children}</div>
    </div>
  )
}
