import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
import {toast} from 'react-toastify'


const FoodItem = ({id,name, price, description, image}) => {
  
    const {cartItems, addToCart, removeFromCart,url} = useContext(StoreContext);

    const clickHandler=()=>{
      toast.info("Kindly click on + button to add items.");
    }
    return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img onClick={clickHandler} src={url+"/images/"+image} alt="" className="food-item-image" />
        {!cartItems[id] 
            ?<img className='add' onClick={()=>addToCart(id)} src={assets.yellow_add_icon} alt=""/>
            :<div className='food-item-counter'>
                <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                <p>{cartItems[id]}</p>
                <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
            </div>
        }
      </div>
      <div onClick={clickHandler} className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  )
}

export default FoodItem
