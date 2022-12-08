import React from 'react';
import { Characters } from '../../types/Characters';

type Props = {
  character: Characters;
}

export const CardforEpisodeItem: React.FC<Props> = ({ character }) => {
  const { name, image } = character;
  return (
    <div className='onEpisode-location'>
      <img className='onEpisode-location__image' src={image} />
      <p className='onEpisode-location__name'>{name}</p>
    </div>
  );
};