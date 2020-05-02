import React, { useState } from 'react'
import ConvertView, { ConvertViewButton } from '../components/ConvertView'

function convertUriComponent(value, encodeOrDecode) {
  if (!value) return
  switch (encodeOrDecode) {
    case 'encode':
      return encodeURIComponent(value)
    case 'decode':
      return decodeURIComponent(value)
    default:
      return 'Invalid state'
  }
}

export default function UriComponentEndecode() {
  const [encodeOrDecode, setEncodeOrDecode] = useState('encode')
  return (
    <div>
      <div>
        <ConvertViewButton
          isActive={encodeOrDecode === 'encode'}
          onClick={() => setEncodeOrDecode('encode')}
        >
          Encode
        </ConvertViewButton>
        <ConvertViewButton
          isActive={encodeOrDecode === 'decode'}
          onClick={() => setEncodeOrDecode('decode')}
        >
          Decode
        </ConvertViewButton>
      </div>
      <ConvertView
        convertFn={(value) => convertUriComponent(value, encodeOrDecode)}
      />
    </div>
  )
}
