import React, { useState } from 'react'
import ConvertView, { ConvertViewButton } from '../components/ConvertView'

function convertUri(value, encodeOrDecode) {
  if (!value) return
  switch (encodeOrDecode) {
    case 'encode':
      return encodeURI(value)
    case 'decode':
      return decodeURI(value)
    default:
      return 'Invalid state'
  }
}

export default function UriEndecode() {
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
      <ConvertView convertFn={(value) => convertUri(value, encodeOrDecode)} />
    </div>
  )
}
