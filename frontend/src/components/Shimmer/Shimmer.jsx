import React from 'react'
import './Shimmer.css'

const Shimmer = () => {
  return (
    <div className="bodi">
      <div className="cards">
      <div className="shimmer"></div>
      <h3 className='text'>Kindly wait few seconds as the website is loading actual data from backend.
      As free instances on this hosting platform spin down after periods of inactivity.
      Try reopening the website if actual data is not loaded even after 60 seconds.
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
