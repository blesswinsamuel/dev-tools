import React from 'react'
import styles from './Button.module.css'

function Button({ children, selected, className, ...props }) {
  return (
    <div className={[className, styles.Button, selected && styles.Selected].filter(x => x).join(' ')} {...props}>
      {children}
    </div>
  )
}

export default Button
