import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from './classNames'
import menu from './menu'

export default function Layout({ children }) {
  const router = useRouter()
  return (
    <div>
      <nav className="w-full bg-primary">
        <ul>
          {menu.map((item) => (
            <li key={item.href} className="inline-block">
              <Link href={item.href}>
                <a
                  className={classNames(
                    'block p-4 transition duration-200 ease text-black hover:bg-white',
                    router.pathname === item.href && 'bg-white'
                  )}
                >
                  {item.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="relative m-4">{children}</div>
    </div>
  )
}
