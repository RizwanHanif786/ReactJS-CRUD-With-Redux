import React from 'react'
import { Route, Routes } from 'react-router-dom'
import About from '../components/About'
import Home from '../components/Home'
import Tournament from '../pages/Tournament/Tournament'


  function Routing() {
  return (
    <>
    <Routes>
      <Route  path={'/'} element={<Tournament/>} ></Route>
      <Route  path={'/tournaments'} element={<Tournament/>} ></Route>
      </Routes>
    </>
  )
}

export default Routing