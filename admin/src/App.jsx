import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import {Route, Routes} from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home'
import Login from './components/Login/Login'



const App = () => {

  const [showLogin,setShowLogin] = useState(false);

  return (
    <>
        <ToastContainer/>
        {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
        <div className="app">
          <Navbar setShowLogin={setShowLogin}/>
          <hr />
          <div className="app-content">
            <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/add" element={<Add/>}></Route>
              <Route path="/list" element={<List/>}></Route>
              <Route path="/orders" element={<Orders/>}></Route>
            </Routes>
          </div>
        </div>
    </>
  );
}

export default App
