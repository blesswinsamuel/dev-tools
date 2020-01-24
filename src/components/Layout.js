import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Layout.module.css'

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/avro">Avro</Link>
          </li>
          <li>
            <Link to="/timestamp">Timestamp</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
