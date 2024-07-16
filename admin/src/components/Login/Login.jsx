import React, { useContext, useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'


const Login = ({setShowLogin}) => {


    const {url,setToken} = useContext(StoreContext);
    const [data,setData] = useState({
      email:"",
      password:""
    })

    const navigate = useNavigate();

    const onChangeHandler =(event)=>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}));
    }

    const onLogin = async(event) =>{
      event.preventDefault();
      let newUrl = url;
      
      newUrl+="/api/admin/login";
      
      const response = await axios.post(newUrl,data);

      if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false);
        toast.success("Login Success");
        navigate('/add');
      }
      else{
        toast.error(response.data.message)
      }
    }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className='login-popup-title'>
            <h2>Admin Login</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="X" />
        </div>
        <div className='login-popup-inputs'>
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Enter Admin Email' required />
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Enter Pasword' required />
        </div>
        <button type='submit'>Login</button>        
      </form>
    </div>
  )
}

export default Login
