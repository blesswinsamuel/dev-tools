import React, { useState } from 'react'
import ConvertView, { ConvertViewButton } from '../components/ConvertView'

function convertUriComponent(
  value: string,
  encodeOrDecode: 'encode' | 'decode'
): string {
  if (!value) return ''
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
  return (
    <div>
      <ConvertView
        convertFn={(value, encodeOrDecode) =>
          convertUriComponent(value, encodeOrDecode)
        }
      />
    </div>
  )
}
