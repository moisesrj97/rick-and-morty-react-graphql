import { render, screen } from '@testing-library/react';
import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import { Gallery } from './Gallery';
import {
  CHARACTERS_QUERY,
  EPISODES_QUERY,
  LOCATIONS_QUERY,
} from './GalleryQueries';

const charactersMock = {
  request: {
    query: CHARACTERS_QUERY,
    variables: {
      page: 1,
      filter: { name: '' },
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
};

const locationMock = {
  request: {
    query: LOCATIONS_QUERY,
    variables: {
      page: 1,
      filter: { name: '' },
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
};

const episodesMock = {
  request: {
    query: EPISODES_QUERY,
    variables: {
      page: 1,
      filter: { name: '' },
    },
  },
  result: {
    data: {
      episodes: {
        results: [
          {
            id: '1',
            name: 'Rick Sanchez',
            episode: 'S1',
          },
          {
            id: '2',
            name: 'Morty Smith',
            episode: 'S1',
          },
        ],
      },
    },
  },
};

const charactersMockError = {
  request: {
    query: CHARACTERS_QUERY,
    variables: {
      page: 1,
    },
  },
  error: new Error("Can't find Rick"),
};

describe('Given Gallery component', () => {
  describe('When it is loading', () => {
    test('It should show loading state', () => {
      const mockSetContentLoading = jest.fn();
      render(
        <MockedProvider mocks={[charactersMock]}>
          <Gallery
            pageIndex={1}
            setContentLoading={mockSetContentLoading}
            type="Characters"
            searchValue=""
          />
        </MockedProvider>
      );

      expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });
  });
  describe('When there is an error loading', () => {
    test('It should show error state', async () => {
      const mockSetContentLoading = jest.fn();
      render(
        <MockedProvider mocks={[charactersMockError]}>
          <Gallery
            pageIndex={1}
            setContentLoading={mockSetContentLoading}
            type="Characters"
            searchValue=""
          />
        </MockedProvider>
      );

      expect(await screen.findByText(/Error/i)).toBeInTheDocument();
    });
  });
  describe('When it receives characters type', () => {
    test('It should render that info', async () => {
      const mockSetContentLoading = jest.fn();

      render(
        <MockedProvider mocks={[charactersMock]}>
          <MemoryRouter>
            <Gallery
              pageIndex={1}
              setContentLoading={mockSetContentLoading}
              type="Characters"
              searchValue=""
            />
          </MemoryRouter>
        </MockedProvider>
      );

      const elementsArr = charactersMock.result.data.characters.results;

      expect(await screen.findByText(elementsArr[0].name)).toBeInTheDocument();
    });
  });
  describe('When it receives location type', () => {
    test('It should render that info', async () => {
      const mockSetContentLoading = jest.fn();
      render(
        <MockedProvider mocks={[locationMock]}>
          <MemoryRouter>
            <Gallery
              pageIndex={1}
              setContentLoading={mockSetContentLoading}
              type="Locations"
              searchValue=""
            />
          </MemoryRouter>
        </MockedProvider>
      );

      const elementsArr = locationMock.result.data.locations.results;

      expect(await screen.findByText(elementsArr[0].name)).toBeInTheDocument();
    });
  });
  describe('When it receives episode type', () => {
    test('It should render that info', async () => {
      const mockSetContentLoading = jest.fn();
      render(
        <MockedProvider mocks={[episodesMock]}>
          <MemoryRouter>
            <Gallery
              pageIndex={1}
              setContentLoading={mockSetContentLoading}
              type="Episodes"
              searchValue=""
            />
          </MemoryRouter>
        </MockedProvider>
      );

      const elementsArr = episodesMock.result.data.episodes.results;

      expect(await screen.findByText(elementsArr[0].name)).toBeInTheDocument();
    });
  });
});
