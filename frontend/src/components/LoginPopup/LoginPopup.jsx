import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import { toast } from 'react-toastify'

const LoginPopup = ({setShowLogin}) => {

    const {url,setToken} = useContext(StoreContext);
    const [currState, setCurrState] = useState("Sign Up");
    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler =(event)=>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}));
    }

    const onLogin = async(event) =>{
      event.preventDefault();
      let newUrl = url;
      if(currState==="Login"){
        newUrl+="/api/user/login";
      }
      else{
        newUrl +="/api/user/register";
      }
      const response = await axios.post(newUrl,data);

      if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false);
        if(currState=="Login")
        toast.success("Login Success")
        else 
        toast.success("Registered Successfully")
      }
      else{
        toast.error(response.data.message)
      }
    }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className='login-popup-title'>
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className='login-popup-inputs'>
            {currState==="Login"?<></>:<input name='name' type="text" onChange={onChangeHandler} value={data.name} placeholder='Your name' required />}
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Pasword' required />
        </div>
        <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState==="Login"?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span> </p>
        :<p>Already have an account? <span onClick={()=>{setCurrState("Login")}}>Login here</span></p>}
        
        
      </form>
    </div>
  )
}

export default LoginPopup
