import React, { useState } from 'react'
import classNames from './classNames'

function Tabs({ data, rightElement }) {
  const [selected, setSelected] = useState(0)
  return (
    <div>
      <div className="flex">
        {data.map((tab, i) => {
          return (
            <div
              key={i}
              className={classNames(
                'cursor-pointer p-2 bg-gray-300 border border-gray-600 hover:bg-gray-400',
                i === selected && 'bg-gray-500'
              )}
              onClick={() => setSelected(i)}
            >
              {tab.title}
            </div>
          )
        })}
        <div className="self-center ml-auto">{rightElement}</div>
      </div>
      <div>
        {data.map((tab) => tab.children).find((tab, i) => i === selected)}
      </div>
    </div>
  )
}

export default Tabs
