import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.jsx"
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { GameProvider } from './context/GameContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GameProvider>
    <App />
    <ToastContainer />
  </GameProvider>
)
