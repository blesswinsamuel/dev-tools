import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Layout.module.css'

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <NavLink to="/" activeClassName={styles.active} exact>Home</NavLink>
          </li>
          <li>
            <NavLink to="/avro" activeClassName={styles.active} exact>Avro</NavLink>
          </li>
          <li>
            <NavLink to="/timestamp" activeClassName={styles.active} exact>Timestamp</NavLink>
          </li>
          <li>
            <NavLink to="/base64" activeClassName={styles.active} exact>Base64</NavLink>
          </li>
          <li>
            <NavLink to="/uri-endecode" activeClassName={styles.active} exact>URI</NavLink>
          </li>
          <li>
            <NavLink to="/uri-component-endecode" activeClassName={styles.active} exact>URI Component</NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
