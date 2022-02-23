import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Given Card component', () => {
  describe('When receives props', () => {
    test('It should render that info', () => {
      const mockProps = {
        title: 'Test title',
        image: 'test-image.jpg',
        episode: 'Test episode',
      };
      render(
        <Card
          title={mockProps.title}
          image={mockProps.image}
          episode={mockProps.episode}
        />
      );

      expect(screen.getByText(mockProps.title)).toBeInTheDocument();
      expect(screen.getByText(mockProps.episode)).toBeInTheDocument();
      expect(screen.getByAltText(mockProps.title)).toBeInTheDocument();
      expect(screen.getByAltText(mockProps.title).getAttribute('src')).toBe(
        'test-image.jpg'
      );
    });
  });
});
