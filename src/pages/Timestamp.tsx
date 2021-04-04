import React, { useEffect, useState } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import formatISO from 'date-fns/formatISO'
import formatRFC7231 from 'date-fns/formatRFC7231'

const getCurrentEpoch = () => Math.round(new Date().getTime() / 1000)

const fromEpoch = (tsStr) => {
  const unit = (() => {
    if (tsStr.length > 10) return 'milliseconds'
    else return 'seconds'
  })()
  const ts = (() => {
    switch (unit) {
      case 'milliseconds':
        return parseInt(tsStr)
      case 'seconds':
        return parseInt(tsStr) * 1000
      default:
        return 0
    }
  })()
  try {
    const d = new Date(ts)
    return {
      unit,
      date: d,
      table: [
        ['ISO 8601', formatISO(d)],
        // ['RFC 3339', formatRFC3339(d)],
        ['RFC 7231', formatRFC7231(d)],
        // ['GMT', d.toUTCString()],
        // ['Your time zone', d.toString()],
        ['Relative', formatDistanceToNow(d, { addSuffix: true })],
      ],
    }
  } catch (e) {
    return { error: 'This timestamp is not valid' }
  }
}

const fromHumanStr = (tsStr) => {
  try {
    const d = new Date(tsStr)
    return {
      date: d,
      table: [
        ['Epoch', Math.round(d.getTime() / 1000)],
        ['Epoch (in milliseconds)', d.getTime()],
        ['ISO 8601', formatISO(d)],
        // ['RFC 3339', formatRFC3339(d)],
        ['RFC 7231', formatRFC7231(d)],
        // ['GMT', d.toUTCString()],
        // ['Your time zone', d.toString()],
        ['Relative', formatDistanceToNow(d, { addSuffix: true })],
      ],
    }
  } catch (e) {
    return { error: 'This timestamp is not valid' }
  }
}

function EpochToTimestamp() {
  const [value, setValue] = useState(getCurrentEpoch)
  const render = () => {
    const { error, unit, table } = fromEpoch(value)
    if (error) return <>{error}</>
    return (
      <>
        Assuming that this timestamp is in <b>{unit}</b>:<br />
        <table>
          <tbody>
            {table.map((row, i) => (
              <tr key={i}>
                {row.map((cell, i) => (
                  <td key={i} className={i === 0 ? 'font-bold' : ''}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  }

  return (
    <>
      <input
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
      />
      <div className="text-gray-600 italic">
        Supports Unix timestamps in seconds and milliseconds.
      </div>
      {render()}
    </>
  )
}

function HumanDateToTimestamp() {
  const [value, setValue] = useState(() => new Date().toString())
  const render = () => {
    const { error, table } = fromHumanStr(value)
    if (error) return <>{error}</>
    return (
      <table>
        <tbody>
          {table.map((row, i) => (
            <tr key={i}>
              {row.map((cell, i) => (
                <td key={i} className={i === 0 ? 'font-bold' : ''}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <div className="text-gray-600 italic"></div>
      {render()}
    </>
  )
}

function CurrentTime() {
  const [currentTs, setCurrentTs] = useState(getCurrentEpoch)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTs(getCurrentEpoch())
    }, 1000)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="mb-4">
      The current Unix epoch time is{' '}
      <span className="bg-gray-300 p-2">{currentTs}</span>
    </div>
  )
}

export default function Timestamp() {
  return (
    <>
      <CurrentTime />
      <EpochToTimestamp />
      <br />
      <br />
      <HumanDateToTimestamp />
    </>
  )
}
