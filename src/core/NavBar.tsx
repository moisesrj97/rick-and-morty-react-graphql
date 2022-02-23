import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import { MenuItemI } from '../App';

import './NavBar.scss';

interface PropsI {
  navLinks: MenuItemI[];
}

export function NavBar({ navLinks }: PropsI): JSX.Element {
  const activeC = 'underline underline-offset-4 decoration-green-400';
  const inactiveC = 'hover:underline  underline-offset-4 decoration-green-400';

  const isActiveLink = (iA: boolean): string => (iA ? activeC : inactiveC);

  return (
    <header className="text-white w-full flex justify-between px-5 py-2">
      <Link to="/">
        <hgroup className="flex gap-5 items-center">
          <img
            src="/assets/logo.png"
            alt="Page logo"
            className="spinning w-12"
          />
          <h1 className="hidden">Rick & Morty ft. GraphQL</h1>
        </hgroup>
      </Link>
      <ul className="flex gap-4 items-center text-xl">
        {navLinks.map(({ tag, url }) => (
          <li key={url}>
            <Link to={url} className={({ isActive }) => isActiveLink(isActive)}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
