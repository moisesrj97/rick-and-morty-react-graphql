/* eslint-disable operator-linebreak */
import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '../../containers/Card/Card';

interface EpisodeDetailsQueryResultI {
  episode: {
    name: string;
    air_date: string;
    episode: string;
    characters: {
      id: string;
      name: string;
      image: string;
    }[];
  };
}

interface EpisodeDetailsQueryVariablesI {
  episodeId?: string;
}

export const EPISODE_DETAILS_QUERY = gql`
  query EpisodeDetailsQuery($episodeId: ID!) {
    episode(id: $episodeId) {
      name
      air_date
      episode
      characters {
        id
        name
        image
      }
    }
  }
`;

export function EpisodeDetail(): JSX.Element {
  const { id } = useParams();

  const { loading, error, data } = useQuery<
    EpisodeDetailsQueryResultI,
    EpisodeDetailsQueryVariablesI
  >(EPISODE_DETAILS_QUERY, {
    variables: { episodeId: id },
  });

  return (
    <div className="flex flex-col items-center justify-center text-white">
      {error && <p className="text-4xl text-white text-center">Error :(</p>}
      {loading && <p className="text-4xl text-white text-center">Loading...</p>}
      {data && (
        <div className="w-8/12">
          <h2 className="font-bold text-4xl text-center mb-5">
            {data.episode.name}
            {data.episode.episode &&
              data.episode.episode !== 'unknown' &&
              ` (${data.episode.episode})`}
            {data.episode.air_date &&
              data.episode.air_date !== 'unknown' &&
              ` (${data.episode.air_date})`}
          </h2>
          <h4 className="text-center text-3xl my-6">
            <strong>Characters:</strong>
          </h4>
          <div className="flex flex-wrap gap-3 justify-center mt-2 ">
            {data.episode.characters.map((character) => (
              <Link to={`/characters/${character.id}`} key={character.id}>
                <Card title={character.name} image={character.image} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
