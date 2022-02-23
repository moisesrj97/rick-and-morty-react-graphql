import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Given Footer Component', () => {
  describe('When the component render', () => {
    test('It should load test and have a link to linkedin', () => {
      render(<Footer />);
      expect(screen.getByText(/made with 💚 by/i)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Moisés/i })).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: /Moisés/i }).getAttribute('href')
      ).toMatch(/linkedin\.com/);
    });
  });
});
