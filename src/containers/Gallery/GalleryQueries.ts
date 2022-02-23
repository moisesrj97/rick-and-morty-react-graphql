import { gql } from '@apollo/client';

export const CHARACTERS_QUERY = gql`
  query CharactersQuery($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        image
      }
    }
  }
`;

export const LOCATIONS_QUERY = gql`
  query LocationsQuery($page: Int) {
    locations(page: $page) {
      results {
        id
        name
      }
    }
  }
`;

export const EPISODES_QUERY = gql`
  query EpisodesQuery($page: Int) {
    episodes(page: $page) {
      results {
        id
        name
        episode
      }
    }
  }
`;
