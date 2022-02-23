import { DocumentNode, gql, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Card } from '../Card/Card';
import {
  CHARACTERS_QUERY,
  LOCATIONS_QUERY,
  EPISODES_QUERY,
} from './GalleryQueries';

interface QueryVariableI {
  page: number;
}

interface GalleryPropsI {
  pageIndex: number;
  setContentLoading: (loading: boolean) => void;
  type: 'Characters' | 'Episodes' | 'Locations';
}

export function Gallery({
  pageIndex,
  setContentLoading,
  type,
}: GalleryPropsI): JSX.Element {
  let QUERY: DocumentNode;

  interface QueryResultI {
    [key: string]: {
      results: [
        {
          id: string;
          name: string;
          image?: string;
          episode?: string;
        }
      ];
    };
  }

  switch (type) {
    case 'Characters':
      QUERY = CHARACTERS_QUERY;
      break;
    case 'Episodes':
      QUERY = EPISODES_QUERY;
      break;
    default:
      QUERY = LOCATIONS_QUERY;
  }

  const { loading, error, data } = useQuery<QueryResultI, QueryVariableI>(
    QUERY,
    {
      variables: { page: pageIndex },
    }
  );

  useEffect(
    () => (loading ? setContentLoading(true) : setContentLoading(false)),
    [loading, setContentLoading]
  );

  return (
    <div className="flex flex-wrap gap-4 justify-center my-8 mx-6">
      {error && <p className="text-4xl text-white">Error :(</p>}
      {loading && <p className="text-4xl text-white">Loading...</p>}
      {data?.[type.toLowerCase()].results.map((item) => (
        <Card
          key={item.id}
          image={item.image}
          title={item.name}
          episode={item.episode}
        />
      ))}
    </div>
  );
}
