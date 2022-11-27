import axios from 'axios';
import React, { useEffect, useState } from 'react';
import usePagination from '../../hooks/usePagination';
import { Characters } from '../../types/Characters';
import { Pagination } from '../Pagination/Pagination';
import { CardforEpisodeItem } from './CardforEpisodeItem';
import './CardforEpisode.scss';
import { Loader } from '../Loader/Loader';

type Props = {
  CharacterEpisode: string[];
  setCharacterEpisode: (param: string[]) => void;
}

export const CardforEpisode: React.FC<Props> = ({ CharacterEpisode, setCharacterEpisode }) => {
  const [charOfEpisode, setCharOfEpisode] = useState<Characters[]>();

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
    count: CharacterEpisode.length,
  });
  useEffect(() => {
    async function getAllCharForEpisode() {
      const data = await Promise.all(
        CharacterEpisode.map((item) => {
          return axios(item)
            .then(data => data.data)
            .catch(e => console.log(e));
        })
      );
      setCharOfEpisode(data);
    }
    getAllCharForEpisode();
  }, [CharacterEpisode]);

  return (
    <>
      <p className='back'
        onClick={() => setCharacterEpisode([])}
      > Back
      </p>
      <ul className='onEpisode'>
        {charOfEpisode ? (
          charOfEpisode.
            slice(firstContentIndex, lastContentIndex)
            .map((char) => (
              <>
                <li
                  key={char.id}
                >
                  <CardforEpisodeItem character={char} />
                </li>
                <Pagination
                  nextPage={nextPage}
                  prevPage={prevPage}
                  page={page}
                  setPage={setPage}
                  totalPages={totalPages}
                />
              </>
            ))) : (<Loader />)}
      </ul>
    </>
  );
};


