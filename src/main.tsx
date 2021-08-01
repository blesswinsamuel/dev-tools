import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
// @ts-ignore
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    // show a prompt to user
    updateSW()
  },
  onOfflineReady() {
    // show a ready to work offline to user
    console.log('Ready for offline use.')
  },
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
