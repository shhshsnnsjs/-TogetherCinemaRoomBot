import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style.css'

const tg = window.Telegram?.WebApp
tg?.ready()
tg?.expand()
tg?.setHeaderColor?.('#fff3f6')
tg?.setBackgroundColor?.('#fff3f6')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>
)
