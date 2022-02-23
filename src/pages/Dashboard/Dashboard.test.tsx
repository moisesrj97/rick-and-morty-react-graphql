import React from 'react';
import { render, screen } from '@testing-library/react';
import { Dashboard } from './Dashboard';

describe('Given Dashboard component', () => {
  describe('When it renders', () => {
    test('It should render dashboard test', () => {
      render(<Dashboard />);
      expect(screen.getByText(/Rick & Morty ft. GraphQL/i)).toBeInTheDocument();
    });
  });
});
