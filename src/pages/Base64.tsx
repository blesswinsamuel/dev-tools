import React, { useState } from 'react'
import ConvertView, { ConvertViewButton } from '../components/ConvertView'

function convertBase64(
  value: string,
  encodeOrDecode: 'encode' | 'decode'
): string {
  if (!value) return ''
  switch (encodeOrDecode) {
    case 'encode':
      return btoa(value)
    case 'decode':
      return atob(value)
    default:
      return 'Invalid state'
  }
}

export default function Base64() {
  const [encodeOrDecode, setEncodeOrDecode] = useState<'encode' | 'decode'>(
    'encode'
  )
  return (
    <div>
      <div className="flex justify-center">
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
        convertFn={(value) => convertBase64(value, encodeOrDecode)}
      />
    </div>
  )
}
