/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

export function Footer(): JSX.Element {
  return (
    <div className="text-white w-full">
      <p className="text-center">
        Made with 💚 by{' '}
        <a
          href="https://www.linkedin.com/in/moisesrodriguezjurado/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-green-400"
        >
          Moisés
        </a>
      </p>
    </div>
  );
}
