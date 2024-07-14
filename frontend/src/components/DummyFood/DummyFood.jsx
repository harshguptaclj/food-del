import React from 'react'
import './DummyFood.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import dummyFoodList from '../../assets/dummyFoodList.json'


const DummyFood = () => {
  const food_list = dummyFoodList.data;
  return (
    <>
      <div className="food-display" id="food-display">
        <h2>Top dishes near you</h2>

        <div className="food-display-list">
          {food_list.map((item, index) => {
             {
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
      </div>
    </>
  );
};

export default DummyFood;
