
import React from 'react'
import './App.css'
import Routing from './Routes/Routing'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <div className="">
      <Routing />
      {/* Toast message */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App
