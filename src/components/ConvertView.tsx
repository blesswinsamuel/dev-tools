import React, { useState } from 'react'
import classNames from './classNames'

function handleError(fn: () => string) {
  try {
    return fn()
  } catch (e: any) {
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
  convertFn: (v: string, encodeOrDecode: 'encode' | 'decode') => string
}) {
  const [decoded, setDecoded] = useState('')
  const [encoded, setEncoded] = useState('')
  return (
    <div className="flex w-100 h-100">
      <div className="form-control flex-1 my-4 mx-4 min-h-screen">
        <label className="label" htmlFor="decoded">
          <span className="label-text">Decoded</span>
        </label>
        <textarea
          id="decoded"
          className="textarea h-96"
          value={decoded}
          onChange={(e) => {
            setDecoded(e.target.value)
            setEncoded(handleError(() => convertFn(e.target.value, 'encode')))
          }}
        />
      </div>
      <div className="form-control flex-1 my-4 mr-4 min-h-screen">
        <label className="label" htmlFor="encoded">
          <span className="label-text">Encoded</span>
        </label>
        <textarea
          id="encoded"
          className="textarea h-96"
          value={encoded}
          onChange={(e) => {
            setEncoded(e.target.value)
            setDecoded(handleError(() => convertFn(e.target.value, 'decode')))
          }}
        />
      </div>
    </div>
  )
}
