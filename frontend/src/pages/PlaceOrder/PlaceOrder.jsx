import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import {toast} from 'react-toastify'


const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url,currency,deliveryCharge,setCartItems} =useContext(StoreContext);

  const [payment, setPayment] = useState("cod");
  const [data,setData] =useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler =(event)=>{
    const name= event.target.name;
    const value= event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder= async(e)=>{
    e.preventDefault();
    let orderItems =[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo =item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount : getTotalCartAmount()+40,
    }
    if(payment==="stripe"){
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if(response.data.success){
      const {session_url} =response.data;
      window.location.replace(session_url);
    }
    else{
      toast.error("Something Went Wrong")
    }
  }
  else{
    let response = await axios.post(url + "/api/order/placecod", orderData, { headers: { token } });
            if (response.data.success) {
                navigate("/myorders")
                toast.success(response.data.message)
                setCartItems({});
            }
            else {
                toast.error("Something Went Wrong")
            }
  }
}

  const navigate= useNavigate();

  useEffect(()=>{
    if(!token){
      toast.error("to place an order sign in first")
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate("/cart")
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name'/>
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName}  type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email}  type="email" placeholder='Email address'/>
        <input required name='street' onChange={onChangeHandler} value={data.street}  type="street" placeholder='Street'/>
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city}  type="city" placeholder='City'/>
          <input required name='state' onChange={onChangeHandler} value={data.state}  type="state" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode}  type="zipcode" placeholder='Zip code'/>
          <input required name='country' onChange={onChangeHandler} value={data.country}  type="country" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone}  type="phone" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details"><p>Subtotal</p><p>{currency}{getTotalCartAmount()}</p></div>
                        <hr />
                        <div className="cart-total-details"><p>Delivery Fee</p><p>{currency}{getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p></div>
                        <hr />
                        <div className="cart-total-details"><b>Total</b><b>{currency}{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}</b></div>
                    </div>
                </div>
                <div className="payment">
                    <h2>Payment Method</h2>
                    <div onClick={() => setPayment("cod")} className="payment-option">
                        <img src={payment === "cod" ? assets.checked_icon : assets.unchecked_icon} alt="" />
                        <p>COD ( Cash on delivery )</p>
                    </div>
                    <div onClick={() => setPayment("stripe")} className="payment-option">
                        <img src={payment === "stripe" ? assets.checked_icon : assets.unchecked_icon} alt="" />
                        <p>Stripe ( Credit / Debit )</p>
                    </div>
                </div>
                <button className='place-order-submit' type='submit'>{payment==="cod"?"Place Order":"Proceed To Payment"}</button>
      </div>
    </form>
  )
}

export default PlaceOrder
