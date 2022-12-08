import React, { useEffect, useState } from 'react';
import { Locations } from '../../types/Locations';
import { FilterForm } from '../Form/FilterForm';
import { LocationItem } from './LocationItem';
import './location.scss';
import usePagination from '../../hooks/usePagination';
import { Pagination } from '../Pagination/Pagination';
import { CardCharactersOnLocation } from '../CardCharacters/CardCharactersOnLocation';
import { getAllLocation } from '../../api/http';

export const LocationList: React.FC = ( ) => {
  const [characterOnLocation, setCharacterOnLocation] = useState<string[]>([]);
  const [Locations, setLocations] = useState<Locations[]>([]);
  const [Query, setQuery] = useState('');
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

  async function setAllLocation() {
    try {
      const locations = await getAllLocation();

      setLocations(locations);
    } catch (error) {
      throw new Error('error');
    }
  }

  const handleCheckItem = (...itemPart: string[]) => {
    return (
      itemPart.find(itemInfo => {
        return itemInfo.toLowerCase().includes(Query.toLocaleLowerCase());
      })
    );
  };

  const filterLocations = Locations.filter((location) => {
    const { name, type, dimension } = location;

    return (
      handleCheckItem(name, type, dimension)
    );
  });

  useEffect(() => {
    setAllLocation();
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

                {filterLocations
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