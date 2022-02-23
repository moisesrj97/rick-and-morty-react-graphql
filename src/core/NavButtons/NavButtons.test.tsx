import React from 'react';
import { render, screen } from '@testing-library/react';
import { NavButtons } from './NavButtons';

describe('Given NavButtons', () => {
  describe('When given middle indexes', () => {
    test('Both buttons should render', () => {
      const nextPageMock = jest.fn();
      const prevPageMock = jest.fn();

      render(
        <NavButtons
          currentPage={3}
          maxPage={10}
          nextPage={nextPageMock}
          prevPage={prevPageMock}
        />
      );

      expect(screen.getByText('Prev')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
    });
  });
  describe('When given first index', () => {
    test('Only next should render', () => {
      const nextPageMock = jest.fn();
      const prevPageMock = jest.fn();

      render(
        <NavButtons
          currentPage={1}
          maxPage={10}
          nextPage={nextPageMock}
          prevPage={prevPageMock}
        />
      );

      expect(screen.queryByText('Prev')).not.toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
    });
  });
  describe('When given last index', () => {
    test('Only prev should render', () => {
      const nextPageMock = jest.fn();
      const prevPageMock = jest.fn();

      render(
        <NavButtons
          currentPage={10}
          maxPage={10}
          nextPage={nextPageMock}
          prevPage={prevPageMock}
        />
      );

      expect(screen.queryByText('Next')).not.toBeInTheDocument();
      expect(screen.getByText('Prev')).toBeInTheDocument();
    });
  });
});
