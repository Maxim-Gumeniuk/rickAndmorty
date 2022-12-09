import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';
import { actions as currentCharacterAction} from '../../features/currentCharacter';
import { useAppDispatch } from '../../app/hooks';

export const Header = () => {
  const dispatch = useAppDispatch();
  
  const clearCurrentId = () => {
    dispatch(currentCharacterAction.clear());
  };

  return (
    <nav className='header__nav nav'>
      <ul className='nav__list'>
        <li className='nav__item'>
          <NavLink
            to="/"
            className='nav__link'
            onClick={() => clearCurrentId()}
          >
            Home
          </NavLink>
        </li>
        <li className='nav__item'>
          <NavLink
            to="Characters"
            className='nav__link'
            onClick={() => clearCurrentId()}
          >
            Characters
          </NavLink>
        </li>
        <li className='nav__item'>
          <NavLink
            to="Locations"
            className='nav__link'
            onClick={() => clearCurrentId()}
          >
            Locations
          </NavLink>
        </li>
        <li className='nav__item'>
          <NavLink
            to="Episodes"
            className='nav__link'
            onClick={() => clearCurrentId()}
          >
            Episodes
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};


