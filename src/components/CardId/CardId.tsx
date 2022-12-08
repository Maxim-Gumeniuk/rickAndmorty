import React from 'react';
import '../../source/back.scss';
import { Link } from 'react-router-dom';
import './CardId.scss';
import { useAppSelector } from '../../app/hooks';

export const CardId: React.FC= () => {
  const currentCharacter = useAppSelector(state => state.currentCharacter);

  return (
    <>
      <Link 
        className='back'
        to="/Characters"
      >back
      </Link>
      <div className="characterId">
        <img src={currentCharacter?.image} alt="" className="characterId__image" />
        <p className="characterId__name">
          {currentCharacter?.name}  
        </p>
        <p className="characterId__gender">
          gender: {currentCharacter?.gender}
        </p>
        <p className="characterId__species">
          {currentCharacter?.species}
        </p>
      </div>
    </>
  );
};