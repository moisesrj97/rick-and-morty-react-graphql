import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

/* import { render } from './utils/router-test-wrapper'; */

describe('App', () => {
  test('renders learn react link', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const linkElement = screen.getByText(/dashboard/i);
    expect(linkElement).toBeInTheDocument();
  });
});
