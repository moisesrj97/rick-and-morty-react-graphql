import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

import { CharacterDetail, CHARACTER_DETAILS_QUERY } from './CharacterDetail';

const mockCharacterResponse = {
  request: {
    query: CHARACTER_DETAILS_QUERY,
    variables: {
      characterId: '1',
    },
  },
  result: {
    data: {
      character: {
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: 'Test',
        gender: 'Male',
        origin: {
          id: '1',
          name: 'Earth (C-137)',
        },
        location: {
          id: '3',
          name: 'Citadel of Ricks',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: [
          {
            id: '1',
            name: 'Pilot',
          },
        ],
      },
    },
  },
};

const mockError = {
  request: {
    query: CHARACTER_DETAILS_QUERY,
    variables: {
      characterId: '1',
    },
  },
  error: new Error('Error'),
};

describe('Given CharacterDetailComponent', () => {
  describe('When given a character and waited for data to load', () => {
    test('It renders that character', async () => {
      render(
        <MockedProvider mocks={[mockCharacterResponse]}>
          <MemoryRouter initialEntries={['/characters/1']}>
            <Routes location="/characters/1">
              <Route path="/characters/:id" element={<CharacterDetail />} />
            </Routes>
          </MemoryRouter>
        </MockedProvider>
      );

      expect(
        await screen.findByText(
          mockCharacterResponse.result.data.character.name
        )
      ).toBeInTheDocument();
    });
  });
  describe('When given a character and loading', () => {
    test('It renders loading', () => {
      render(
        <MockedProvider mocks={[mockCharacterResponse]}>
          <MemoryRouter initialEntries={['/characters/1']}>
            <Routes location="/characters/1">
              <Route path="/characters/:id" element={<CharacterDetail />} />
            </Routes>
          </MemoryRouter>
        </MockedProvider>
      );

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });
  describe('When given a character and error', () => {
    test('It renders error', async () => {
      render(
        <MockedProvider mocks={[mockError]}>
          <MemoryRouter initialEntries={['/characters/1']}>
            <Routes location="/characters/1">
              <Route path="/characters/:id" element={<CharacterDetail />} />
            </Routes>
          </MemoryRouter>
        </MockedProvider>
      );

      expect(await screen.findByText(/error/i)).toBeInTheDocument();
    });
  });
});
