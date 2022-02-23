import React from 'react';
import { NavLink as Link } from 'react-router-dom';

import './NavBar.scss';

export function NavBar(): JSX.Element {
  const underlineClass = 'underline underline-offset-4 decoration-green-500';

  const isActiveLink = (iA: boolean): string => (iA ? underlineClass : '');

  return (
    <header className="text-white w-full flex justify-between px-5 py-2">
      <Link to="/">
        <hgroup className="flex gap-5 items-center">
          <img
            src="/assets/logo.png"
            alt="Page logo"
            className="spinning w-12"
          />
          <h1 className="text-3xl font-light">Rick & Morty ft. GraphQL</h1>
        </hgroup>
      </Link>
      <ul className="flex gap-4 items-center text-xl">
        <li>
          <Link
            to="/characters/"
            className={({ isActive }) => isActiveLink(isActive)}
          >
            Characters
          </Link>
        </li>
        <li>
          <Link
            to="/locations/"
            className={({ isActive }) => isActiveLink(isActive)}
          >
            Locations
          </Link>
        </li>
        <li>
          <Link
            to="/episodes/"
            className={({ isActive }) => isActiveLink(isActive)}
          >
            Episodes
          </Link>
        </li>
        <li>
          <Link
            to="/about/"
            className={({ isActive }) => isActiveLink(isActive)}
          >
            About
          </Link>
        </li>
      </ul>
    </header>
  );
}
