import React from 'react'
import './Shimmer.css'

const Shimmer = () => {
  return (
    <div className="bodi">
      <div className="cards">
      <div className="shimmer"></div>
      <h3 className='text'>Notice: Kindly reopen the website, if food items are not loaded even after 10 seconds.
      Because free instances on this hosting platform spin down after periods of inactivity.
      Sorry for inconvinience! </h3>
      </div>
      {Array.from({ length: 32 }).map((el, i) => {
        return (
          <div key={i} className="card">
            <div className="shimmer"></div>
            <div className="content">
              <h2></h2>
              <p></p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Shimmer
