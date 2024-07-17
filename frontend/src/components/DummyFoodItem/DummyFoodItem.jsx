import React, { useContext } from 'react'
import './DummyFoodItem.css'
import { assets } from '../../assets/assets'
import { dummy , menuList} from '../../assets/dummyFoodList';
import { StoreContext } from '../../context/StoreContext';
import {toast} from 'react-toastify'


const DummyFoodItem = ({id,name, price, description, image}) => {
  
    const {cartItems} = useContext(StoreContext);

    const clickHandler=()=>{
      toast.info("Kindly wait few seconds as the website is loading actual data from backend.");
      toast.info("As free instances on this hosting platform spin down after periods of inactivity.");
      toast.info("Try reopening the website if actual data is not loaded even after 60 seconds.");
    }
    return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img onClick={clickHandler} src={image} alt="" className="food-item-image" />
        {!cartItems[id] 
            ?<img className='add' onClick={clickHandler} src={assets.yellow_add_icon} alt=""/>
            :<div className='food-item-counter'>
                <img onClick={clickHandler} src={assets.remove_icon_red} alt="" />
                <p>{cartItems[id]}</p>
                <img onClick={clickHandler} src={assets.add_icon_green} alt="" />
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

export default DummyFoodItem
