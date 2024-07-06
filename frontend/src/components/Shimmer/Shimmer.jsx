import React from 'react'
import './Shimmer.css'

const Shimmer = () => {
  return (
    <div className="bodi">
      {Array.from({ length: 10 }).map((el, i) => {
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
