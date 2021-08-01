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
  return (
    <div>
      <ConvertView
        convertFn={(value, encodeOrDecode) =>
          convertBase64(value, encodeOrDecode)
        }
      />
    </div>
  )
}
