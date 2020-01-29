import React, { useEffect, useState } from 'react'

const getCurrentEpoch = () => Math.round(new Date().getTime() / 1000)

const timestampToString = tsStr => {
  const ts = tsStr.length > 10 ? parseInt(tsStr) : parseInt(tsStr) * 1000
  try {
    return new Date(ts).toLocaleString()
  } catch (e) {
    return e.toString()
  }
}

export default function Timestamp() {
  const [currentTs, setCurrentTs] = useState(getCurrentEpoch)
  const [value, setValue] = useState('')
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTs(getCurrentEpoch())
    }, 1000)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div>
      {currentTs}
      <br />
      <input value={value} onChange={e => setValue(e.target.value)} />
      {value && (
        <>
          <div>{timestampToString(value)}</div>
        </>
      )}
    </div>
  )
}
