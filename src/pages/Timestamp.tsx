import React, { useEffect, useState } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import formatISO from 'date-fns/formatISO'
import formatRFC7231 from 'date-fns/formatRFC7231'
import formatRFC3339 from 'date-fns/formatRFC3339'

const getCurrentEpoch = () => Math.round(new Date().getTime() / 1000)

const fromInput = (tsStr: string) => {
  const unit = (() => {
    if (isNaN(+tsStr)) return 'other'
    if (tsStr.length > 16) return 'nanoseconds'
    if (tsStr.length > 13) return 'microseconds'
    if (tsStr.length > 10) return 'milliseconds'
    if (tsStr.length === 10) return 'seconds'
  })()
  const ts = (() => {
    switch (unit) {
      case 'nanoseconds':
        return parseInt(tsStr) / 1e6
      case 'microseconds':
        return parseInt(tsStr) / 1000
      case 'milliseconds':
        return parseInt(tsStr)
      case 'seconds':
        return parseInt(tsStr) * 1000
      default:
        return tsStr
    }
  })()
  try {
    const d = new Date(ts)
    return {
      unit,
      date: d,
      table: [
        ['Epoch', Math.round(d.getTime() / 1000)],
        ['Epoch (in milliseconds)', d.getTime()],
        [
          'ISO 8601',
          formatISO(d, { format: 'extended', representation: 'complete' }),
        ],
        ['RFC 3339', formatRFC3339(d, { fractionDigits: 3 })],
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

export default function Timestamp() {
  return (
    <div className="m-4">
      <CurrentTime />
      <HumanDateToTimestamp />
    </div>
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

function HumanDateToTimestamp() {
  const [value, setValue] = useState(() => getCurrentEpoch().toString())
  const render = () => {
    const { error, unit, table } = fromInput(value)
    if (error) return <>{error}</>
    return (
      <>
        {unit !== 'other' && (
          <p className="p">
            Assuming that this timestamp is in <b>{unit}</b>
          </p>
        )}
        <table className="table">
          <tbody>
            {(table as any[]).map((row, i) => (
              <tr key={i}>
                {(row as any[]).map((cell, i) => (
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
      <div className="form-control mb-4">
        <label className="label" htmlFor="human-input">
          <span className="label-text">Convert from any date format</span>
        </label>
        <input
          id="human-input"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <label className="label italic">
          <span className="label-text-alt">
            Supports timestamps in seconds, milliseconds, microseconds,
            nanoseconds, ISO 8601, RFC 7231 and RFC 3339.
          </span>
        </label>
      </div>
      {render()}
    </>
  )
}
