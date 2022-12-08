import axios from 'axios';
import '../../source/back.scss';
import React, { useEffect, useState } from 'react';
import usePagination from '../../hooks/usePagination';
import { Characters } from '../../types/Characters';
import { Pagination } from '../Pagination/Pagination';
import { CardforEpisodeItem } from './CardforEpisodeItem';
import './CardforEpisode.scss';
import { Loader } from '../Loader/Loader';
import { useAppDispatch } from '../../app/hooks';
import { actions as currentCharacterAction} from '../../features/currentCharacter';
import { Link } from 'react-router-dom';

type Props = {
  CharacterEpisode: string[];
  setCharacterEpisode: (param: string[]) => void;
}

export const CardforEpisode: React.FC<Props> = ({ CharacterEpisode, setCharacterEpisode }) => {
  const [charOfEpisode, setCharOfEpisode] = useState<Characters[]>([]);
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
    contentPerPage: 10,
    count: CharacterEpisode.length,
  });

  const changeCurrentCharacter = (character: number) => {
    dispatch(currentCharacterAction.setCharacter(character));
  };

  async function getAllCharForEpisode() {
    try {
      const data = await Promise.all(
        CharacterEpisode.map((item) => {
          return axios(item)
            .then(data => data.data)
            .catch(e => console.log(e));
        })
      );
      setCharOfEpisode(data);
    } catch {
      throw new Error();
    } finally {
      setTimeout(() => {
        setLoading(true);
      }, 2000);
    }
  }

  const clearCurrentId = () => {
    setCharacterEpisode([]);
    dispatch(currentCharacterAction.clear());
  };

  useEffect(() => {
    getAllCharForEpisode();
  }, [charOfEpisode]);

  return (
    <>
      {loading ? (<>
        <p className='back'
          onClick={() => clearCurrentId()}
        > Back
        </p>
        <ul className='onEpisode'>
          {charOfEpisode.length > 0 && (
            charOfEpisode
              .slice(firstContentIndex, lastContentIndex)
              .map((char) => (
                <Link 
                  to={`/Characters/${char.id}`}
                  key={char.id}
                >
                  <li
                    onClick={() => changeCurrentCharacter(char.id)}>
                    <CardforEpisodeItem character={char} />
                  </li>
                </Link>
              )))}
        </ul>
        <Pagination
          nextPage={nextPage}
          prevPage={prevPage}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        /></>
      ) : (<Loader />)}
    </>
  );
};


