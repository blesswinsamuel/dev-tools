import React, { useState } from 'react'
import classNames from './classNames'

function handleError(fn: () => string) {
  try {
    return fn()
  } catch (e) {
    return e.toString()
  }
}

export function ConvertViewButton({
  isActive,
  ...props
}: {
  isActive: boolean
} & React.ComponentProps<'button'>) {
  return (
    <button
      className={classNames(
        'bg-gray-300 hover:bg-gray-200 px-4 py-2 cursor-pointer focus:outline-none focus:ring focus:ring-gray-300 transition ease duration-300',
        isActive && 'bg-gray-900 text-white hover:bg-gray-600'
      )}
      {...props}
    />
  )
}

export default function ConvertView({
  convertFn,
}: {
  convertFn: (v: string) => string
}) {
  const [value, setValue] = useState('')
  return (
    <div className="flex w-100">
      <textarea
        className={'flex-1 my-4 mr-4 min-h-screen'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <textarea
        className={'flex-1 my-4 min-h-screen'}
        disabled
        value={handleError(() => convertFn(value))}
      />
    </div>
  )
}
