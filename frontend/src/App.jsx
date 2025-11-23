import React from 'react'
import Header from './Components/Header'
import Home from './Components/Home'
import Stats from './Components/Stats'
import { Route, Routes } from 'react-router'

function App() {

  return (
    <div>
        {/* <Header/> */}
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/code/:code" element={<Stats />} />
        </Routes>
    </div>
  )
}

export default App