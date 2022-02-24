import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { NavButtons } from './NavButtons';
import { MemoryRouter } from 'react-router-dom';

describe('Given NavButtons', () => {
  describe('When given middle indexes', () => {
    test('Both buttons should render', () => {
      const nextPageMock = jest.fn();
      const prevPageMock = jest.fn();

      render(
        <MemoryRouter>
          <NavButtons
            currentPage={3}
            maxPage={10}
            nextPage={nextPageMock}
            prevPage={prevPageMock}
          />
        </MemoryRouter>
      );

      expect(screen.getByText('Prev')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Prev'));
      expect(prevPageMock).toHaveBeenCalled();
      fireEvent.click(screen.getByText('Next'));
      expect(nextPageMock).toHaveBeenCalled();
    });
  });
  describe('When given first index', () => {
    test('Only next should render', () => {
      const nextPageMock = jest.fn();
      const prevPageMock = jest.fn();

      render(
        <MemoryRouter>
          <NavButtons
            currentPage={1}
            maxPage={10}
            nextPage={nextPageMock}
            prevPage={prevPageMock}
          />
        </MemoryRouter>
      );

      expect(screen.queryByText('Prev')).not.toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Next'));
      expect(nextPageMock).toHaveBeenCalled();
    });
  });
  describe('When given last index', () => {
    test('Only prev should render', () => {
      const nextPageMock = jest.fn();
      const prevPageMock = jest.fn();

      render(
        <MemoryRouter>
          <NavButtons
            currentPage={10}
            maxPage={10}
            nextPage={nextPageMock}
            prevPage={prevPageMock}
          />
        </MemoryRouter>
      );

      expect(screen.queryByText('Next')).not.toBeInTheDocument();
      expect(screen.getByText('Prev')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Prev'));
      expect(prevPageMock).toHaveBeenCalled();
    });
  });
});
