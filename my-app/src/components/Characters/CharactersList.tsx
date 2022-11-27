import React, { useEffect } from 'react';
import { Characters } from '../../types/Characters';
import { FilterForm } from '../Form/FilterForm';
import { CharactersItem } from './CharacterItem';
import usePagination from '../../hooks/usePagination';
import { Pagination } from '../Pagination/Pagination';
import { Link } from 'react-router-dom';

type Props = {
  Characters: Characters[];
  setQuery: (param: string) => void;
  setCharacterOnId: (param: Characters | null ) => void;
}

export const CharactersList: React.FC<Props> = ({ Characters, setQuery, setCharacterOnId }) => {
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage: 8,
    count: Characters.length,
  });

  const findCharacter = (id: number) => {
    const person = Characters.find(char => char.id === id);
    setCharacterOnId(person || null);
  };

  useEffect(() => {
    setQuery('');
  }, []);

  return (
    <>
      <FilterForm setQuery={setQuery} />
      <p className='title'> Just click on the card </p>
      <ul className='flex-row'>
        
        {Characters
          .slice(firstContentIndex, lastContentIndex)
          .map((character: Characters) => (
            <Link 
              to={`/Characters/${character.id}`} 
              key={character.id}
            >
              <li 
                onClick={() => findCharacter(character.id)}
              >
                <CharactersItem character={character} />
              </li>
            </Link>
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
  );
};