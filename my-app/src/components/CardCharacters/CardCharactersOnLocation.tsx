import './CardCharactersOnLocation.scss';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Characters } from '../../types/Characters';
import { Pagination } from '../Pagination/Pagination';
import usePagination from '../../hooks/usePagination';
import { CardCharacterOnLocationitem } from './CardCharacterOnLocationitem';
import { Loader } from '../Loader/Loader';

type Props = {
  characterOnLocation: string[];
  setCharacterOnLocation: (param: string[]) => void;
}

export const CardCharactersOnLocation: React.FC<Props> = ({ characterOnLocation, setCharacterOnLocation }) => {
  const [charOnLocation, setCharOnLocation] = useState<Characters[]>();
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
    async function getAllCharFromLocation() {
      const chars = await Promise.all(
        characterOnLocation.map((char) => {
          return axios(char)
            .then(data => data.data)
            .catch(e => console.log(e));
        })
      );
      setCharOnLocation(chars);
    }
    getAllCharFromLocation();
  }, [characterOnLocation]);

  return (
    <>
      <div>
        <p
          className='back'
          onClick={() => setCharacterOnLocation([])}
        >
          Back
        </p>
        <ul className='onLocation'>
          {charOnLocation ? (
            charOnLocation
              .slice(firstContentIndex, lastContentIndex)
              .map((item) => (
                <li
                  className='onLocation__item'
                  key={item.id}
                >
                  <CardCharacterOnLocationitem person={item} />
                </li>
              ))) : (<Loader />)}
        </ul>
      </div>
      <Pagination
        nextPage={nextPage}
        prevPage={prevPage}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </>
  );
};
