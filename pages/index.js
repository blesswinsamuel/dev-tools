import Link from 'next/link'
import menu from '../components/menu'
import React from 'react'

function Home() {
  return (
    <ul>
      {menu.map((item) => (
        <li key={item.href}>
          <Link href={item.href}>
            <a>{item.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Home
