/* eslint-disable indent */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

interface CharacterDetailsQueryResultI {
  character: {
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
      id: string;
      name: string;
    };
    location: {
      id: string;
      name: string;
    };
    image: string;
    episode: {
      id: string;
      name: string;
    }[];
  };
}

interface CharacterDetailsQueryVariablesI {
  characterId?: string;
}

export const CHARACTER_DETAILS_QUERY = gql`
  query CharacterDetailsQuery($characterId: ID!) {
    character(id: $characterId) {
      name
      status
      species
      type
      gender
      origin {
        id
        name
      }
      location {
        id
        name
      }
      image
      episode {
        id
        name
      }
    }
  }
`;

export function CharacterDetail(): JSX.Element {
  const { id } = useParams();

  const { loading, error, data } = useQuery<
    CharacterDetailsQueryResultI,
    CharacterDetailsQueryVariablesI
  >(CHARACTER_DETAILS_QUERY, {
    variables: { characterId: id },
  });

  return (
    <div className="flex flex-col items-center justify-center text-white">
      {error && <p className="text-4xl text-white text-center">Error :(</p>}
      {loading && <p className="text-4xl text-white text-center">Loading...</p>}
      {data && (
        <div className="w-8/12">
          <h2 className="font-bold text-4xl text-center mb-5">
            {data.character.name}
          </h2>
          <div className="flex w-full justify-center align-center">
            <img
              className="rounded-md"
              src={data.character.image}
              alt={data.character.name}
            />
            <div className="p-5 flex flex-col justify-center text-xl">
              {data.character.status && (
                <p>
                  <strong>Status:</strong> {data.character.status}
                </p>
              )}
              {data.character.species && (
                <p>
                  <strong>Species:</strong> {data.character.species}
                </p>
              )}
              {data.character.type && (
                <p>
                  <strong>Type:</strong> {data.character.type}
                </p>
              )}
              {data.character.origin.name &&
                data.character.origin.name !== 'unknown' && (
                  <p>
                    <strong>Origin: </strong>{' '}
                    <Link
                      to={`/locations/${data.character.origin.id}`}
                      className="text-green-400 hover:underline"
                    >
                      {data.character.origin.name}
                    </Link>
                  </p>
                )}
              {data.character.location.name &&
                data.character.location.name !== 'unknown' && (
                  <p>
                    <strong>Location:</strong>{' '}
                    <Link
                      to={`/locations/${data.character.location.id}`}
                      className="text-green-400 hover:underline"
                    >
                      {data.character.location.name}
                    </Link>
                  </p>
                )}
            </div>
          </div>
          <h4 className="text-center text-3xl mt-5">
            <strong>Episodes:</strong>
          </h4>
          <div className="flex flex-wrap gap-3 justify-center mt-2 ">
            {data.character.episode.map((episode) => (
              <Link
                to={`/episodes/${episode.id}`}
                className="border border-green-400 p-3 rounded-md hover:scale-110 hover:shadow-green-400 hover:shadow-lg transition-all"
                key={episode.id}
              >
                <p>{episode.name}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
