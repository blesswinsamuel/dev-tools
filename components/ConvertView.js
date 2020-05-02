import React, { useState } from 'react'
import classNames from './classNames'

function handleError(fn) {
  try {
    return fn()
  } catch (e) {
    return e.toString()
  }
}

export function ConvertViewButton({ isActive, ...props }) {
  return (
    <button
      className={classNames(
        'bg-gray-300 p-4 cursor-pointer',
        isActive && 'bg-gray-500'
      )}
      {...props}
    />
  )
}

export default function ConvertView({ convertFn }) {
  const [value, setValue] = useState('')
  return (
    <div className="flex w-100">
      <textarea
        className={'flex-1 m-4 min-h-screen'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <textarea
        className={'flex-1 m-4 min-h-screen'}
        disabled
        value={handleError(() => convertFn(value))}
      />
    </div>
  )
}
