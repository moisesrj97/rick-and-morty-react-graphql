import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

import { LocationDetail, LOCATION_DETAILS_QUERY } from './LocationDetail';

const mockLocationResponse = {
  request: {
    query: LOCATION_DETAILS_QUERY,
    variables: {
      locationId: '1',
    },
  },
  result: {
    data: {
      location: {
        name: 'Earth (C-137)',
        type: 'Planet',
        dimension: 'Dimension C-137',
        residents: [
          {
            id: '38',
            name: 'Beth Smith',
            image: 'https://rickandmortyapi.com/api/character/avatar/38.jpeg',
          },
        ],
      },
    },
  },
};

const mockError = {
  request: {
    query: LOCATION_DETAILS_QUERY,
    variables: {
      locationId: '1',
    },
  },
  error: new Error('Error'),
};

describe('Given locationDetailComponent', () => {
  describe('When given a location and waited for data to load', () => {
    test('It renders that location', async () => {
      render(
        <MockedProvider mocks={[mockLocationResponse]}>
          <MemoryRouter initialEntries={['/locations/1']}>
            <Routes location="/locations/1">
              <Route path="/locations/:id" element={<LocationDetail />} />
            </Routes>
          </MemoryRouter>
        </MockedProvider>
      );

      expect(await screen.findByText(/Earth \(C-137\)/i)).toBeInTheDocument();
    });
  });
  describe('When given a location and loading', () => {
    test('It renders loading', () => {
      render(
        <MockedProvider mocks={[mockLocationResponse]}>
          <MemoryRouter initialEntries={['/locations/1']}>
            <Routes location="/locations/1">
              <Route path="/locations/:id" element={<LocationDetail />} />
            </Routes>
          </MemoryRouter>
        </MockedProvider>
      );

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });
  describe('When given a location and error', () => {
    test('It renders error', async () => {
      render(
        <MockedProvider mocks={[mockError]}>
          <MemoryRouter initialEntries={['/locations/1']}>
            <Routes location="/locations/1">
              <Route path="/locations/:id" element={<LocationDetail />} />
            </Routes>
          </MemoryRouter>
        </MockedProvider>
      );

      expect(await screen.findByText(/error/i)).toBeInTheDocument();
    });
  });
});
