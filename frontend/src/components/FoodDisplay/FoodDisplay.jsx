import React from 'react'
import './FoodDisplay.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import Shimmer from '../Shimmer/Shimmer'
import DummyFood from '../DummyFood/DummyFood'

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)
  return (
    <>
    {!food_list.length?(<><DummyFood/><Shimmer /></>):(
      <div className="food-display" id="food-display">
        <h2>Top dishes near you</h2>
        {!food_list.length ? (
          <Shimmer />
        ) : (
          <div className="food-display-list">
            {food_list.map((item, index) => {
              if (category === "All" || category === item.category) {
                return (
                  <FoodItem
                    key={index}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                  />
                );
              }
            })}
          </div>
        )}
      </div>
    )}
    </>
  );
}

export default FoodDisplay
