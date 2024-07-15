import React from 'react'
import './DummyFood.css'
import DummyFoodItem from '../DummyFoodItem/DummyFoodItem'
import {menuList } from '../../assets/dummyFoodList'


const DummyFood = () => {
  const food_list = menuList;
  return (
    <>
      <div className="food-display" id="food-display">
        <h2>Top dishes near you</h2>

        <div className="food-display-list">
          {food_list.map((item, index) => {
             {
              return (
                <DummyFoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  description={item.description}
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
