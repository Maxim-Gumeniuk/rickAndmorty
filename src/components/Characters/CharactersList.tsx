import React, { useEffect, useState } from 'react';
import { Characters } from '../../types/Characters';
import { FilterForm } from '../Form/FilterForm';
import { CharactersItem } from './CharacterItem';
import usePagination from '../../hooks/usePagination';
import { Pagination } from '../Pagination/Pagination';
import { Link } from 'react-router-dom';
import { getAllCharacters } from '../../api/http';
import { Loader } from '../Loader/Loader';
import { handleCheckItem } from '../../source/checkItem';
import { useAppDispatch } from '../../app/hooks';
import { actions as currentCharacterAction} from '../../features/currentCharacter';

export const CharactersList: React.FC = () => {
  const [Characters, setCharacters] = useState<Characters[]>([]);
  const [Query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

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

  const changeCurrentCharacter = (character: number) => {
    dispatch(currentCharacterAction.setCharacter(character));
  };

  async function setAllCharacters() {
    try {
      const characters = await getAllCharacters();

      setCharacters(characters);
    } catch (error) {
      throw new Error('error');
    } finally {
      setTimeout(() =>{
        setLoading(true);
      },1000);
    }
  }

  const filterCharacters = Characters.filter((character) => {
    const { name, gender, species, status } = character;

    return (
      handleCheckItem(Query, name, gender, species, status)
    );
  });

  useEffect(() => {
    setAllCharacters();
  }, []);

  return (
    <>
      {loading ? (
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
                    onClick={() => changeCurrentCharacter(character.id)}
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
      ) : (<Loader />) }
    </>
  );
};