import React from 'react';
import { Link } from 'react-router-dom';
import { Characters } from '../../types/Characters';
import './CardId.scss';

type Props = {
  characterOnId: Characters | null;
};

export const CardId: React.FC<Props> = ({ characterOnId = null }) => {
  return (
    <>
      <Link 
        className='back'
        to="/Characters"
      >back
      </Link>
      <div className="characterId">
        <img src={characterOnId?.image} alt="" className="characterId__image" />
        <p className="characterId__name">
          {characterOnId?.name}
        </p>
        <p className="characterId__gender">
          gender: {characterOnId?.gender}
        </p>
        <p className="characterId__species">
          species: {characterOnId?.species}
        </p>
      </div>
    </>
  );
};