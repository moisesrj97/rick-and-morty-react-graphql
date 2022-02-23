import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NavBar } from './NavBar';

describe('Given NavBar Component', () => {
  describe('When the component is given routes as props', () => {
    test('Then the component should render the routes', () => {
      const mockRoutes = [
        {
          tag: 'MockRoute',
          url: '/mock-route',
        },
        {
          tag: 'Test',
          url: '/test',
        },
      ];

      render(
        <MemoryRouter>
          <NavBar navLinks={mockRoutes} />
        </MemoryRouter>
      );

      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.getAllByRole('link')).toHaveLength(mockRoutes.length + 1);
      mockRoutes.forEach(({ tag, url }) => {
        const linkElement = screen.getByRole('link', {
          name: tag,
        });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement.getAttribute('href')).toBe(url);
      });
    });
  });
});
