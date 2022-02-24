import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Locations, LOCATIONS_PAGES_AMOUNT_QUERY } from './Locations';
import { LOCATIONS_QUERY } from '../../containers/Gallery/GalleryQueries';

const mocks = [
  {
    request: {
      query: LOCATIONS_QUERY,
      variables: {
        page: 1,
      },
    },
    result: {
      data: {
        locations: {
          results: [
            {
              id: '1',
              name: 'Rick Sanchez',
            },
            {
              id: '2',
              name: 'Morty Smith',
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: LOCATIONS_QUERY,
      variables: {
        page: 2,
      },
    },
    result: {
      data: {
        locations: {
          results: [
            {
              id: '3',
              name: 'Rick Sanchez 2',
            },
            {
              id: '4',
              name: 'Morty Smith 2',
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: LOCATIONS_PAGES_AMOUNT_QUERY,
    },
    result: {
      data: {
        locations: {
          info: {
            pages: 42,
          },
        },
      },
    },
  },
];

describe('Given locations component', () => {
  describe('When it has renders', () => {
    test('Information should be displayed and buttons found', async () => {
      render(
        <MockedProvider mocks={mocks}>
          <MemoryRouter>
            <Locations />
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
            <Locations />
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
            <Locations />
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
