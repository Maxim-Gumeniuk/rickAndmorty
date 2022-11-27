import React from 'react';
import { Locations } from '../../types/Locations';
import './location.scss';

type Props = {
  location: Locations;
}

export const LocationItem: React.FC<Props> = ({ location }) => {
  const { name, type, dimension } = location;
  return (
    <div className="location">
      <p className="location__name">name: {name}</p>
      <p className="location__type">type: {type}</p>
      <p className="location__dimension">dimension: {dimension}</p>
    </div>
  );
};