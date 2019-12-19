import React, { useState } from 'react'
import styles from './Tabs.module.css'

function Tabs({ data, rightElement }) {
  const [selected, setSelected] = useState(0)
  return (
    <div className={styles.TabContainer}>
      <div className={styles.TabTitles}>
        {data.map((tab, i) => {
          return (
            <div
              key={i}
              className={[styles.TabTitle, i === selected && styles.Selected]
                .filter(x => x)
                .join(' ')}
              onClick={() => setSelected(i)}
            >
              {tab.title}
            </div>
          )
        })}
        <div className={styles.TabRight}>{rightElement}</div>
      </div>
      <div className={styles.TabPanel}>
        {data.map(tab => tab.children).find((tab, i) => i === selected)}
      </div>
    </div>
  )
}

export default Tabs
