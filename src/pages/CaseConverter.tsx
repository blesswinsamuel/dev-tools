import React, { useState } from 'react'
import ConvertView, { ConvertViewButton } from '../components/ConvertView'
import { snakeCase, camelCase, startCase, kebabCase } from 'lodash-es'

type Modes = 'snake' | 'pascal' | 'camel' | 'kebab'

function convertCase(value: string, mode: Modes): string {
  if (!value) return ''

  switch (mode) {
    case 'snake':
      return snakeCase(value)
    case 'pascal':
      return startCase(camelCase(value)).replace(/ /g, '')
    case 'camel':
      return camelCase(value)
    case 'kebab':
      return kebabCase(value)
    default:
      return 'Invalid mode'
  }
}

export default function CaseConverter() {
  const [mode, setEncodeOrDecode] = useState<Modes>('snake')
  return (
    <div>
      <div className="flex justify-center">
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
