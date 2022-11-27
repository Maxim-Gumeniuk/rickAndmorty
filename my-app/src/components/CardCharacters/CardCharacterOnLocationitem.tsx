import React from 'react';
import './CardCharactersOnLocation.scss';
import { Characters } from '../../types/Characters';

type Props = {
  person: Characters;
};

export const CardCharacterOnLocationitem: React.FC<Props> = ({ person }) => {
  const { image, name } = person;
  return (
    <div className='character-location'>
      <img className='character-location__image' src={image} />
      <p className='character-location__name'>{name}</p>
    </div>
  );
};
