import { gql } from '@apollo/client';

export const CHARACTERS_QUERY = gql`
  query CharactersQuery($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      results {
        id
        name
        image
      }
    }
  }
`;

export const LOCATIONS_QUERY = gql`
  query LocationsQuery($page: Int, $filter: FilterLocation) {
    locations(page: $page, filter: $filter) {
      results {
        id
        name
      }
    }
  }
`;

export const EPISODES_QUERY = gql`
  query EpisodesQuery($page: Int, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
      results {
        id
        name
        episode
      }
    }
  }
`;
