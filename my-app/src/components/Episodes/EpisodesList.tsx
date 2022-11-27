import React, { useEffect, useState } from 'react';
import { Episodes } from '../../types/Episodes';
import { EpisodesItem } from './EpisodesItem';
import './episodes.scss';
import { FilterForm } from '../Form/FilterForm';
import usePagination from '../../hooks/usePagination';
import { Pagination } from '../Pagination/Pagination';
import { CardforEpisode } from '../CardforEpisode/CardforEpisode';

type Props = {
  Episodes: Episodes[];
  setQuery: (param: string) => void;
}
export const EpisodeList: React.FC<Props> = ({ Episodes, setQuery }) => {
  const [CharacterEpisode, setCharacterEpisode] = useState<string[]>([]);
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
    count: Episodes.length,
  });

  console.log(Episodes);

  useEffect(() => {
    setQuery('');
  }, []);
  return (
    <>
      {CharacterEpisode.length > 0 ?
        (<CardforEpisode CharacterEpisode={CharacterEpisode} setCharacterEpisode={setCharacterEpisode} />) :
        (<>
          <FilterForm setQuery={setQuery} />
          <p className='title'> Just click on the card </p>
          <ul className='flex-row'>
            {Episodes
              .slice(firstContentIndex, lastContentIndex)
              .map((episodes: Episodes) => (
                <li
                  key={episodes.id}
                  onClick={() => { setCharacterEpisode(episodes.characters); }}
                >
                  <EpisodesItem episodes={episodes} />
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
        </>)}
    </>
  );
};