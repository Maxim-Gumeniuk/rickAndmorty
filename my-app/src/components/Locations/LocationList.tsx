import React, { useEffect, useState } from 'react';
import { Locations } from '../../types/Locations';
import { FilterForm } from '../Form/FilterForm';
import { LocationItem } from './LocationItem';
import './location.scss';
import usePagination from '../../hooks/usePagination';
import { Pagination } from '../Pagination/Pagination';
import { CardCharactersOnLocation } from '../CardCharacters/CardCharactersOnLocation';

type Props = {
  Locations: Locations[];
  setQuery: (param: string) => void;
}

export const LocationList: React.FC<Props> = ({ Locations, setQuery }) => {
  const [characterOnLocation, setCharacterOnLocation] = useState<string[]>([]);
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage: 10,
    count: characterOnLocation.length,
  });

  useEffect(() => {
    setQuery('');
  }, []);

  return (
    <>
      {characterOnLocation.length > 0
        ? (
          <CardCharactersOnLocation characterOnLocation={characterOnLocation} setCharacterOnLocation={setCharacterOnLocation} />) : (
          (
            <>
              <FilterForm setQuery={setQuery} />
              <p className='title'> Just click on the card </p>
              <ul className='flex-row'>

                {Locations
                  .slice(firstContentIndex, lastContentIndex)
                  .map((location: Locations) => (
                    <li
                      key={location.id}
                      onClick={() => setCharacterOnLocation(location.residents)}
                    >
                      <LocationItem location={location} />
                    </li>
                  ))}
              </ul >

              <Pagination
                nextPage={nextPage}
                prevPage={prevPage}
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </>
          ))}
    </>
  );
};