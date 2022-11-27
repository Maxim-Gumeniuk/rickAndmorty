import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
  return (
    <nav className='header__nav nav'>
      <ul className='nav__list'>
        <li className='nav__item'>
          <NavLink
            to="/"
            className='nav__link'
          >
            Home
          </NavLink>
        </li>
        <li className='nav__item'>
          <NavLink
            to="Characters"
            className='nav__link'
          >
            Characters
          </NavLink>
        </li>
        <li className='nav__item'>
          <NavLink
            to="Locations"
            className='nav__link'
          >
            Locations
          </NavLink>
        </li>
        <li className='nav__item'>
          <NavLink
            to="Episodes"
            className='nav__link'
          >
            Episodes
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};