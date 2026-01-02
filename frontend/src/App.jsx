import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loginpopup from './Components/Loginpopup/Loginpopup'
import Header from './Layout/Header/Header'
import Placeorder from './Pages/Placeoder/Placeorder'
import { ToastContainer } from 'react-toastify';
import Cart from './Pages/Cart/Cart'
import Home from './Pages/Home/Home'
import Footer from './Layout/Footer/Footer'
import Verify from './Pages/Verify/Verify'
import Myorder from './Pages/Myorders/Myorder'

const App = () => {

  const [showlogin, setshowlogin] = useState(false)

  return (
    <>
      {showlogin ? <Loginpopup setshowlogin={setshowlogin} /> : <></>}
      <div className="app">
        <Header setshowlogin={setshowlogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Placeorder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorder' element={<Myorder />} />
        </Routes>
        <ToastContainer />
      </div>
      <Footer />
    </>
  )
}

export default App