import React from 'react'
import { NavLink } from 'react-router-dom'
import menu from './menu'

function SearchIcon() {
  return (
    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="shadow bg-base-200 drawer drawer-mobile ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="flex flex-col  drawer-content">
        {/*<label*/}
        {/*  htmlFor="my-drawer-2"*/}
        {/*  className="mb-4 btn btn-primary drawer-button lg:hidden"*/}
        {/*>*/}
        {/*  open menu*/}
        {/*</label>*/}
        <div>{children}</div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <aside className="flex flex-col justify-between border-r border-base-200 bg-base-100 text-base-content w-80">
          <div>
            <div className="sticky inset-x-0 top-0 z-50 hidden w-full py-1 transition duration-200 ease-in-out border-b lg:block border-base-200 bg-base-100">
              <div className="mx-auto space-x-1 navbar max-w-none">
                <div className="flex items-center flex-none">
                  <a
                    href="/"
                    aria-label="Homepage"
                    className="px-2 flex-0 btn btn-ghost md:px-4 nuxt-link-active"
                  >
                    <div className="inline-block text-3xl font-title text-primary">
                      Tools
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
              {menu.map((item) => (
                <li key={item.href}>
                  <NavLink exact to={item.href}>
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
              <li>
                <a
                  href="https://github.com/blesswinsamuel/tools"
                  target="_blank"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>

    // <div className="md:flex flex-col md:flex-row w-full">
    //   <div className="flex flex-col w-64 h-screen px-4 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600">
    //     <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
    //       <a
    //         href="#"
    //         className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
    //       >
    //         TOOLS
    //       </a>
    //     </div>
    //     <div className="relative mt-6">
    //       <span className="absolute inset-y-0 left-0 flex items-center pl-3">
    //         <SearchIcon />
    //       </span>
    //
    //       <input
    //         type="text"
    //         className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
    //         placeholder="Search"
    //       />
    //     </div>
    //     {/*<nav className="bg-gray-800 text-white">*/}
    //     <nav className="flex flex-col  flex-1 mt-6">
    //       {menu.map((item) => (
    //         <NavLink
    //           className="flex items-center px-4 py-2 mt-2 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
    //           key={item.href}
    //           exact
    //           to={item.href}
    //           activeClassName="text-gray-700 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-200"
    //         >
    //           <span className="mx-4 font-medium">{item.title}</span>
    //         </NavLink>
    //       ))}
    //     </nav>
    //   </div>
    //
    //   {/*<div className="container mx-auto flex justify-center py-2 px-4">*/}
    //   {/*        <div key={item.href} className="flex items-center">*/}
    //   {/*            <NavLink*/}
    //   {/*                exact*/}
    //   {/*                to={item.href}*/}
    //   {/*                className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 mx-1 rounded-md text-sm font-medium focus:outline-none focus:ring focus:ring-gray-300 transition ease duration-300"*/}
    //   {/*                activeClassName="bg-gray-900 text-white hover:bg-gray-900"*/}
    //   {/*            >*/}
    //   {/*                {item.title}*/}
    //   {/*            </NavLink>*/}
    //   {/*        </div>*/}
    //   {/*</div>*/}
    //   <div className="flex-auto h-screen relative overflow-y-hidden m-4">
    //     <div>{children}</div>
    //   </div>
    // </div>
  )
}
