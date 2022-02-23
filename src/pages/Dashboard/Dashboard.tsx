import React from 'react';

import './Dashboard.scss';

export function Dashboard(): JSX.Element {
  return (
    <div className="text-white w-full flex justify-center items-center">
      <img src="/assets/logo.png" alt="Logo" className="spinning fixed z-0" />
      <h2 className="text-6xl z-50 stroke-black font-bold">
        Rick & Morty ft. GraphQL
      </h2>
    </div>
  );
}
