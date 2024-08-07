import React from 'react'
import "./App.css"
import { Routes, Route } from "react-router-dom"
//Components
import Home from './componentes/Home/Home'
import Login from './componentes/Login/Login'
import NotFound from './componentes/NotFound/NotFound'
//************ */


function App() {

  return (
    <>
      <div className='custom__container-main'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/home" element={<Home />}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
        <footer className=" custom__footer">
          <div className="content has-text-centered">
            <div className='columns custom__columns-footer'>
              <div className='column custom__column-footer is-color-white'>Aplicación web creada por <strong className='is-color-white has-text-weight-bold'>Pelinski Carlos </strong></div>
              
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App