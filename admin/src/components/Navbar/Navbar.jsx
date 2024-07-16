import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets.js'
import {Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext.jsx';

const Navbar = ({setShowLogin}) => {

  const {token,setToken,frontendUrl} =useContext(StoreContext);

  const navigate= useNavigate();

  const logout =()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    toast.success('Logout Successful');
  }

  const websiteHandler =()=>{
    window.location.href=frontendUrl;
  }
  

  return (
    <div className='navbar'>
      <Link to="/" className="logo">
      <img  src={assets.logo} alt="" />
      </Link>
      <div className='nav'>
      <button onClick={websiteHandler}>Tomato Website</button>
      {!token?<button onClick={()=>setShowLogin(true)}>Sign In</button>
        : <div className="navbar-profile">
          <img className="profile-image" src={assets.profile_image} alt="" />
          <ul className='navbar-profile-dropdown'>
            <li onClick={()=>navigate('/')}><img src={assets.homes_icon} alt="" /><p>Home</p></li>
            <hr />
            <li onClick={()=>navigate('/add')}><img src={assets.add_icon} alt="" /><p>Add</p></li>
            <hr />
            <li onClick={()=>navigate('/list')}><img src={assets.order_icon} alt="" /><p>List</p></li>
            <hr />
            <li onClick={()=>navigate('/orders')}><img src={assets.order_icon} alt="" /><p>Order</p></li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
        </div>
      }
      
      </div>
        
    </div>
  )
}

export default Navbar
