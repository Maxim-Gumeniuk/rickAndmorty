import React, { useEffect, useState } from 'react';
import '../../source/back.scss';
import { Link, useParams } from 'react-router-dom';
import './CardId.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getCharactersById } from '../../api/http';
import { Characters } from '../../types/Characters';
import { actions as currentCharacterAction } from '../../features/currentCharacter';
import { Loader } from '../Loader/Loader';

export const CardId: React.FC = () => {
  const { CharactersId = '0' } = useParams();
  const dispatch = useAppDispatch();
  const currentCharacter = useAppSelector(state => state.currentCharacter);
  const [characterById, setCharacterById] = useState<Characters | null>(null);
  const [loading, setLoading] = useState(false);

  async function getcharacterById(param: number) {
    try {
      const person = await getCharactersById(param);
      setCharacterById(person);
    } catch {
      throw new Error;
    } finally {
      setLoading(true);
    }
  }
  
  const clearCurrentId = () => {
    dispatch(currentCharacterAction.clear());
  };

  useEffect(() => {
    if (+CharactersId > 0) {
      getcharacterById(+CharactersId);
    }
    if (currentCharacter) {
      getcharacterById(currentCharacter);
    }
  }, [CharactersId, currentCharacter]);

  return (
    <>
      {loading ? (<>
        <Link
          className='back'
          to="/Characters"
          onClick={() => clearCurrentId()}
        >
          back
        </Link>
        <div className="characterId">
          <img src={characterById?.image} alt="" className="characterId__image" />
          <p className="characterId__name">
            {characterById?.name}
          </p>
          <p className="characterId__gender">
            gender: {characterById?.gender}
          </p>
          <p className="characterId__species">
            {characterById?.species}
          </p>
        </div>
      </>) : (<Loader />)}
    </>
  );
};
