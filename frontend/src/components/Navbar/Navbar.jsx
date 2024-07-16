import React, { useContext, useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets.js'
import {Link, useNavigate} from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext.jsx';
import { toast } from 'react-toastify';

const Navbar = ({setShowLogin}) => {

  const {getTotalCartAmount,token,setToken, adminUrl} =useContext(StoreContext);

  const searchHandler=()=>{
    toast.info('Search feature is under development.')
  }

  const adminHandler=()=>{
    window.location.href = adminUrl;
  }

  const [menu, setMenu] = useState("home");

  

  const navigate= useNavigate();
  
  const logout =()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    toast.success('Logout Successful');
  }

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
        <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
        <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</a>
      </ul>
      <div className="navbar-right">
        <img onClick={searchHandler} src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        <button onClick={adminHandler}>Admin</button>
        {!token?<button onClick={()=>setShowLogin(true)}>Sign In</button>
        : <div className="navbar-profile">
          <img src={assets.profile_icon} alt="" />
          <ul className='navbar-profile-dropdown'>
            <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
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
