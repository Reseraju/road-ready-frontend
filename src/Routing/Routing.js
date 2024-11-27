import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../Components/Login'

export default function Routing() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </div>
  )
}
