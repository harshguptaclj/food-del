import React, { useContext, useEffect, useState } from 'react'
import './Orders.css'
import {assets} from '../../assets/assets.js'
import Sidebar from '../../components/Sidebar/Sidebar.jsx'
import { StoreContext } from '../../context/StoreContext.jsx'
import axios from 'axios'

const Orders = () => {

  const {orders,  statusHandler} = useContext(StoreContext);

  return (
    <>
    <Sidebar/>
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order,index)=>(
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-itrm-food'>
                {order.items.map((item,index)=>{
                  if(index===order.items.length-1){
                    return item.name +" x "+item.quantity;
                  }
                  else{
                    return item.name + " x "+ item.quantity+", ";
                  }
                })}
              </p>
              <p className='order-item-name'>{order.address.firstName+" "+order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street+", "}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>₹{order.amount}</p>
            <select onChange={(event)=>{statusHandler(event,order._id)}} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delievered">Delievered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default Orders
