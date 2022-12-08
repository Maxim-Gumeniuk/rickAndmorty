import React, { useEffect, useState } from 'react';
import { Characters } from '../../types/Characters';
import { FilterForm } from '../Form/FilterForm';
import { CharactersItem } from './CharacterItem';
import usePagination from '../../hooks/usePagination';
import { Pagination } from '../Pagination/Pagination';
import { Link } from 'react-router-dom';
import { getAllCharacters } from '../../api/http';

export const CharactersList: React.FC = () => {
  const [Characters, setCharacters] = useState<Characters[]>([]);
  const [Query, setQuery] = useState('');
  const [characterOnId, setCharacterOnId] = useState<Characters | null>(null);

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

  
  async function setAllCharacters() {
    try {
      const characters = await getAllCharacters();

      setCharacters(characters);
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

  const filterCharacters = Characters.filter((character) => {
    const { name, gender, species, status } = character;

    return (
      handleCheckItem(name, gender, species, status)
    );
  });

  const findCharacter = (id: number) => {
    const person = Characters.find(char => char.id === id);
    setCharacterOnId(person || null);
  };

  useEffect(() => {
    setQuery('');
    setAllCharacters();
  }, []);

  return (
    <>
      <FilterForm setQuery={setQuery} />
      <p className='title'> Just click on the card </p>
      <ul className='flex-row'>
        
        {filterCharacters
          .slice(firstContentIndex, lastContentIndex)
          .map((character: Characters) => (
            <Link
              className='link-report' 
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