/* eslint-disable operator-linebreak */
import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '../../containers/Card/Card';

interface LocationDetailsQueryResultI {
  location: {
    name: string;
    type: string;
    dimension: string;
    residents: {
      id: string;
      name: string;
      image: string;
    }[];
  };
}

interface LocationDetailsQueryVariablesI {
  locationId?: string;
}

export const LOCATION_DETAILS_QUERY = gql`
  query Location($locationId: ID!) {
    location(id: $locationId) {
      name
      type
      dimension
      residents {
        id
        name
        image
      }
    }
  }
`;

export function LocationDetail(): JSX.Element {
  const { id } = useParams();

  const { loading, error, data } = useQuery<
    LocationDetailsQueryResultI,
    LocationDetailsQueryVariablesI
  >(LOCATION_DETAILS_QUERY, {
    variables: { locationId: id },
  });

  return (
    <div className="flex flex-col items-center justify-center text-white">
      {error && <p className="text-4xl text-white text-center">Error :(</p>}
      {loading && <p className="text-4xl text-white text-center">Loading...</p>}
      {data && (
        <div className="w-8/12">
          <h2 className="font-bold text-4xl text-center mb-5">
            {data.location.name}
            {data.location.dimension &&
              data.location.dimension !== 'unknown' &&
              ` (${data.location.dimension})`}
            {data.location.type &&
              data.location.type !== 'unknown' &&
              ` (${data.location.type})`}
          </h2>
          <h4 className="text-center text-3xl my-6">
            <strong>Characters:</strong>
          </h4>
          <div className="flex flex-wrap gap-3 justify-center mt-2 ">
            {data.location.residents.map((resident) => (
              <Link to={`/characters/${resident.id}`} key={resident.id}>
                <Card title={resident.name} image={resident.image} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
