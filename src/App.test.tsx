import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from './App';

describe('App', () => {
  test('renders learn react link', () => {
    render(
      <MemoryRouter initialEntries={['/characters/']}>
        <Routes location="/characters/">
          <Route path="/characters/" element={<App />} />
        </Routes>
      </MemoryRouter>
    );

    const titles = screen.getAllByText(/Rick & Morty ft. GraphQL/i);
    titles.forEach((title) => expect(title).toBeInTheDocument());
  });
});
