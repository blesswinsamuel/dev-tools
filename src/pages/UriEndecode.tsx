import React, { useState } from 'react'
import ConvertView, { ConvertViewButton } from '../components/ConvertView'

function convertUri(
  value: string,
  encodeOrDecode: 'encode' | 'decode'
): string {
  if (!value) return ''
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
  return (
    <div>
      <ConvertView
        convertFn={(value, encodeOrDecode) => convertUri(value, encodeOrDecode)}
      />
    </div>
  )
}
