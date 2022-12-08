import React, { useEffect, useState } from 'react';
import { Episodes } from '../../types/Episodes';
import { EpisodesItem } from './EpisodesItem';
import './episodes.scss';
import { FilterForm } from '../Form/FilterForm';
import usePagination from '../../hooks/usePagination';
import { Pagination } from '../Pagination/Pagination';
import { CardforEpisode } from '../CardforEpisode/CardforEpisode';
import { getAllEpisodes } from '../../api/http';

export const EpisodeList: React.FC = () => {
  const [CharacterEpisode, setCharacterEpisode] = useState<string[]>([]);
  const [Episodes, setEpisodes] = useState<Episodes[]>([]);
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
    count: Episodes.length,
  });

  async function setAllEpisodes() {
    try {
      const episodes = await getAllEpisodes();

      setEpisodes(episodes);
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

  const filterEpisodes = Episodes.filter((episode) => {
    const { name, air_date } = episode;

    return (
      handleCheckItem(name, air_date)
    );
  });

  useEffect(() => {
    setQuery('');
    setAllEpisodes();
  }, []);
  return (
    <>
      {CharacterEpisode.length > 0 ?
        (<CardforEpisode CharacterEpisode={CharacterEpisode} setCharacterEpisode={setCharacterEpisode} />) :
        (<>
          <FilterForm setQuery={setQuery} />
          <p className='title'> Just click on the card </p>
          <ul className='flex-row'>
            {filterEpisodes
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