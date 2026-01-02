import { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import "./App.css"
import { Routes, Route } from "react-router-dom"
import Add from './Pages/Add/Add'
import List from './Pages/List/List'
import Orders from './Pages/Orders/Orders'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <Navbar />
      <hr className='hr' />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='/' element={<Add />} />
          <Route path='/add' element={<Add />} />
          <Route path='/list' element={<List />} />
          <Route path='/order' element={<Orders />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  )
}

export default App
