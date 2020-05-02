import React, { useState } from 'react'
import ConvertView, { ConvertViewButton } from '../components/ConvertView'

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
const lowerFirstLetter = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toLowerCase() + s.slice(1)
}

const toSnake = (v, joinStr = '_') =>
  v
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join(joinStr)

const toPascal = (v) =>
  v
    .replace(/\W+/g, ' ')
    .split(/[_\-]/)
    .map((word) => capitalize(word))
    .join('')

function convertCase(value, mode) {
  if (!value) return

  switch (mode) {
    case 'snake':
      return toSnake(value)
    case 'pascal':
      return toPascal(value)
    case 'camel':
      return lowerFirstLetter(toPascal(value))
    case 'kebab':
      return toSnake(value, '-')
    default:
      return 'Invalid mode'
  }
}

export default function CaseConverter() {
  const [mode, setEncodeOrDecode] = useState('snake')
  return (
    <div>
      <div>
        <ConvertViewButton
          isActive={mode === 'snake'}
          onClick={() => setEncodeOrDecode('snake')}
        >
          snake_case
        </ConvertViewButton>
        <ConvertViewButton
          isActive={mode === 'pascal'}
          onClick={() => setEncodeOrDecode('pascal')}
        >
          PascalCase
        </ConvertViewButton>
        <ConvertViewButton
          isActive={mode === 'camel'}
          onClick={() => setEncodeOrDecode('camel')}
        >
          camelCase
        </ConvertViewButton>
        <ConvertViewButton
          isActive={mode === 'kebab'}
          onClick={() => setEncodeOrDecode('kebab')}
        >
          kebab-case
        </ConvertViewButton>
      </div>
      <ConvertView convertFn={(value) => convertCase(value, mode)} />
    </div>
  )
}
