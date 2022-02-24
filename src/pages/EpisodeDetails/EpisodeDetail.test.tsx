import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

import { EpisodeDetail, EPISODE_DETAILS_QUERY } from './EpisodeDetail';

const mockEpisodeResponse = {
  request: {
    query: EPISODE_DETAILS_QUERY,
    variables: {
      episodeId: '1',
    },
  },
  result: {
    data: {
      episode: {
        name: 'Pilot',
        air_date: 'December 2, 2013',
        episode: 'S01E01',
        characters: [
          {
            id: '1',
            name: 'Rick Sanchez',
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          },
        ],
      },
    },
  },
};

const mockError = {
  request: {
    query: EPISODE_DETAILS_QUERY,
    variables: {
      episodeId: '1',
    },
  },
  error: new Error('Error'),
};

describe('Given episodeDetailComponent', () => {
  describe('When given a episode and waited for data to load', () => {
    test('It renders that episode', async () => {
      render(
        <MockedProvider mocks={[mockEpisodeResponse]}>
          <MemoryRouter initialEntries={['/episodes/1']}>
            <Routes location="/episodes/1">
              <Route path="/episodes/:id" element={<EpisodeDetail />} />
            </Routes>
          </MemoryRouter>
        </MockedProvider>
      );

      expect(await screen.findByText(/Pilot/i)).toBeInTheDocument();
    });
  });
  describe('When given a episode and loading', () => {
    test('It renders loading', () => {
      render(
        <MockedProvider mocks={[mockEpisodeResponse]}>
          <MemoryRouter initialEntries={['/episodes/1']}>
            <Routes location="/episodes/1">
              <Route path="/episodes/:id" element={<EpisodeDetail />} />
            </Routes>
          </MemoryRouter>
        </MockedProvider>
      );

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });
  describe('When given a episode and error', () => {
    test('It renders error', async () => {
      render(
        <MockedProvider mocks={[mockError]}>
          <MemoryRouter initialEntries={['/episodes/1']}>
            <Routes location="/episodes/1">
              <Route path="/episodes/:id" element={<EpisodeDetail />} />
            </Routes>
          </MemoryRouter>
        </MockedProvider>
      );

      expect(await screen.findByText(/error/i)).toBeInTheDocument();
    });
  });
});
