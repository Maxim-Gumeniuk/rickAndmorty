import React from 'react';
import { Link } from 'react-router-dom';
import './CardId.scss';

export const CardId: React.FC= () => {
  return (
    <>
      <Link 
        className='back'
        to="/Characters"
      >back
      </Link>
      <div className="characterId">
        <img src='' alt="" className="characterId__image" />
        <p className="characterId__name">
        </p>
        <p className="characterId__gender">
          gender
        </p>
        <p className="characterId__species">
        </p>
      </div>
    </>
  );
};