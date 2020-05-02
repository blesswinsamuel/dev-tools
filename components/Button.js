import React from 'react'
import classNames from './classNames'

function Button({ children, selected, className, ...props }) {
  return (
    <div
      className={classNames(
        className,
        'bg-gray-100 hover:bg-gray-200 p-2 pointer border border-gray-300 cursor-pointer',
        selected && 'bg-gray-300'
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Button
