import React from 'react';
import './Loader.scss';

export const Loader: React.FC = () => {
  return (
    <div className="loader">
      <img
        src={require('../../source/rick.jpeg')}
        alt="rick"
        className='loader__image'
      />
    </div>
  );
};