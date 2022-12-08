import './CardCharactersOnLocation.scss';
import '../../source/back.scss';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Characters } from '../../types/Characters';
import { Pagination } from '../Pagination/Pagination';
import usePagination from '../../hooks/usePagination';
import { CardCharacterOnLocationitem } from './CardCharacterOnLocationitem';
import { Loader } from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { actions as currentCharacterAction} from '../../features/currentCharacter';

type Props = {
  characterOnLocation: string[];
  setCharacterOnLocation: (param: string[]) => void;
}

export const CardCharactersOnLocation: React.FC<Props> = ({
  characterOnLocation,
  setCharacterOnLocation
}) => {
  const [charOnLocation, setCharOnLocation] = useState<Characters[]>();
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
    count: characterOnLocation.length,
  });

  async function getAllCharFromLocation() {
    try {
      const chars = await Promise.all(
        characterOnLocation.map((char) => {
          return axios(char)
            .then(data => data.data)
            .catch(e => console.log(e));
        })
      );
      setCharOnLocation(chars);
    } catch {
      throw new Error();
    } finally {
      setTimeout(() => {
        setLoading(true);
      }, 2000);
    }
  }

  const changeCurrentCharacter = (character: Characters) => {
    dispatch(currentCharacterAction.setCharacter(character.id));
  };

  const clearCurrentId = () => {
    setCharacterOnLocation([]);
    dispatch(currentCharacterAction.clear());
  };

  useEffect(() => {
    getAllCharFromLocation();
  }, [characterOnLocation]);

  return (
    <>
      {loading ? (<> <div>
        <p
          className='back'
          onClick={() => clearCurrentId()}
        >
          Back
        </p>
        <ul className='onLocation'>
          {charOnLocation && (
            charOnLocation
              .slice(firstContentIndex, lastContentIndex)
              .map((item) => (
                <Link 
                  className='link-report'
                  to={`/Characters/${item.id}`}
                  key={item.id}
                >
                  <li
                    className='onLocation__item'
                    onClick={() => changeCurrentCharacter(item)}  
                  >
                    <CardCharacterOnLocationitem person={item} />
                  </li>
                </Link>
              )))}
        </ul>
      </div>
      <Pagination
        nextPage={nextPage}
        prevPage={prevPage}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
      </>) : (<Loader />)}

    </>
  );
};
