import { gql, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Card } from '../Card/Card';

interface CharacterThumbnailDataI {
  id: string;
  name: string;
  image: string;
}

interface CharactersQueryResultI {
  characters: {
    results: CharacterThumbnailDataI[];
  };
}

interface CharactersQueryVariablesI {
  page: number;
}

export const CHARACTERS_QUERY = gql`
  query CharacterQuery($page: Int) {
    characters(page: $page) {
      results {
        name
        id
        image
      }
    }
  }
`;

interface GalleryPropsI {
  pageIndex: number;
  setContentLoading: (loading: boolean) => void;
}

export function Gallery({
  pageIndex,
  setContentLoading,
}: GalleryPropsI): JSX.Element {
  const { loading, error, data } = useQuery<
    CharactersQueryResultI,
    CharactersQueryVariablesI
  >(CHARACTERS_QUERY, {
    variables: { page: pageIndex },
  });

  useEffect(
    () => (loading ? setContentLoading(true) : setContentLoading(false)),
    [loading, setContentLoading]
  );

  return (
    <div className="flex flex-wrap gap-4 justify-center my-8 mx-6">
      {error && <p className="text-4xl text-white">Error :(</p>}
      {loading && <p className="text-4xl text-white">Loading...</p>}
      {data?.characters.results.map((character) => (
        <Card
          key={character.id}
          image={character.image}
          title={character.name}
        />
      ))}
    </div>
  );
}
