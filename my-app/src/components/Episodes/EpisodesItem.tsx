import React from 'react';
import { Episodes } from '../../types/Episodes';
import './episodes.scss';

type Props = {
  episodes: Episodes;
}

export const EpisodesItem: React.FC<Props> = ({ episodes }) => {
  const { name, episode, air_date} = episodes;
  return (
    <div className="episode">
      <p className="episode__date">{air_date}</p>
      <p className="episode__name">{name}</p>
      <p className="episode__episod">
        {episode}
      </p>
    </div>
  );
};