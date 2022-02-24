import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Characters, CHARACTERS_PAGES_AMOUNT_QUERY } from './Characters';
import { CHARACTERS_QUERY } from '../../containers/Gallery/GalleryQueries';

const mocks = [
  {
    request: {
      query: CHARACTERS_QUERY,
      variables: {
        page: 1,
      },
    },
    result: {
      data: {
        characters: {
          results: [
            {
              id: '1',
              name: 'Rick Sanchez',
              image: 'rick.jpg',
            },
            {
              id: '2',
              name: 'Morty Smith',
              image: 'morty.jpg',
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: CHARACTERS_QUERY,
      variables: {
        page: 2,
      },
    },
    result: {
      data: {
        characters: {
          results: [
            {
              id: '3',
              name: 'Rick Sanchez 2',
              image: 'rick.jpg',
            },
            {
              id: '4',
              name: 'Morty Smith 2',
              image: 'morty.jpg',
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: CHARACTERS_PAGES_AMOUNT_QUERY,
    },
    result: {
      data: {
        characters: {
          info: {
            pages: 42,
          },
        },
      },
    },
  },
];

describe('Given Characters component', () => {
  describe('When it has renders', () => {
    test('Information should be displayed and buttons found', async () => {
      render(
        <MockedProvider mocks={mocks}>
          <MemoryRouter>
            <Characters searchValue="" />
          </MemoryRouter>
        </MockedProvider>
      );

      expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
      expect(await screen.findAllByRole('button')).toHaveLength(2);
    });
  });
  describe('When it is loading', () => {
    test('Loading should be displayed and buttons not found', () => {
      render(
        <MockedProvider mocks={mocks}>
          <MemoryRouter>
            <Characters searchValue="" />
          </MemoryRouter>
        </MockedProvider>
      );

      expect(screen.getByText(/Loading/i)).toBeInTheDocument();
      expect(screen.queryAllByRole('button')).toHaveLength(0);
    });
  });
  describe('When next is clicked and then prev', () => {
    test('Next page should load and then prev page', async () => {
      render(
        <MockedProvider mocks={mocks}>
          <MemoryRouter>
            <Characters searchValue="" />
          </MemoryRouter>
        </MockedProvider>
      );

      const buttonNext = await screen.findAllByRole('button', {
        name: /next/i,
      });

      fireEvent.click(buttonNext[0]);

      expect(await screen.findByText('Rick Sanchez 2')).toBeInTheDocument();

      const buttonPrev = await screen.findAllByRole('button', {
        name: /prev/i,
      });

      fireEvent.click(buttonPrev[0]);

      expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
    });
  });
});
