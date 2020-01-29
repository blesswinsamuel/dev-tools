import React, { useState } from 'react'
import styles from './Base64.module.css'
import classNames from '../classNames'

function handleError(fn) {
  try {
    return fn()
  } catch (e) {
    return e.toString()
  }
}

function convertUri(value, encodeOrDecode) {
  switch (encodeOrDecode) {
    case 'encode':
      return encodeURI(value)
    case 'decode':
      return decodeURI(value)
    default:
      return 'Invalid state'
  }
}

export default function URIEnDecode() {
  const [value, setValue] = useState('')
  const [encodeOrDecode, setEncodeOrDecode] = useState('encode')
  return (
    <div>
      <div className={styles.encodeDecodeContainer}>
        <button
          className={classNames(
            styles.button,
            encodeOrDecode === 'encode' && styles.selected
          )}
          onClick={() => setEncodeOrDecode('encode')}
        >
          Encode
        </button>
        <button
          className={classNames(
            styles.button,
            encodeOrDecode === 'decode' && styles.selected
          )}
          onClick={() => setEncodeOrDecode('decode')}
        >
          Decode
        </button>
      </div>
      <div className={styles.textAreaContainer}>
        <textarea
          className={styles.textArea}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <textarea
          className={styles.textArea}
          disabled
          value={handleError(() => convertUri(value, encodeOrDecode))}
        />
      </div>
    </div>
  )
}
