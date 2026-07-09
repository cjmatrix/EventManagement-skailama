import { useState } from 'react'

import './App.css'
import Dashboard from './pages/Dashboard'
import {Toaster} from "react-hot-toast"
function App() {


  return (
    <>
    <Toaster 
        position="bottom-right" 
        toastOptions={{
          duration: 3000,
          style: {
            background: 'white',
            color: 'black',
            border:"1px solid purple"
          },
        }} 
      />
     <Dashboard>
     </Dashboard>
    </>
  )
}

export default App
