import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className='outer'>
      <div className="container">
        <h2>Welcome to Tomato Admin Page</h2>
        <p>
          Click on Sign In button on the top-right corner.
          <br/>
          Enter the credentials provided by Website Service Provider to access the admin features.
          <br />
          If you forgot your credentials contact <a href="tel:+917080127050">7080127050</a> to get new credentials.
        </p>
      </div>
    </div>
  );
};

export default Home;
