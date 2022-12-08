import React from 'react';
import { Characters } from '../../types/Characters';
import './Characters.scss';

type Props = {
  character: Characters;
}

export const CharactersItem: React.FC<Props> = ({ character }) => {
  const {name, image, gender, species, status } = character;

  return (
    <div className="character character__box">
      <img src={image} alt="" className="character__image" />
      <p className="character__name">
        {name}
      </p>
      <p className="character__gender">
        gender: {gender}
      </p>
      <p className="character__species">
        species: {species}
      </p>
      <p className="character__status">
        status: {status}
      </p>
    </div>
  );
};