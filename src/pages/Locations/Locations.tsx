import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Gallery } from '../../containers/Gallery/Gallery';
import { NavButtons } from '../../core/NavButtons/NavButtons';

interface CharactersPagesAmountQueryI {
  locations: {
    info: {
      pages: number;
    };
  };
}

export const LOCATIONS_PAGES_AMOUNT_QUERY = gql`
  query locationsPagesAmountQuery {
    locations {
      info {
        pages
      }
    }
  }
`;

export function Locations(): JSX.Element {
  const [pageIndex, setPageIndex] = useState(1);
  const [contentLoading, setContentLoading] = useState(true);
  const { data } = useQuery<CharactersPagesAmountQueryI>(
    LOCATIONS_PAGES_AMOUNT_QUERY
  );

  const nextPage = (): void => {
    setPageIndex(pageIndex + 1);
  };

  const prevPage = (): void => {
    setPageIndex(pageIndex - 1);
  };

  return (
    <>
      {data && !contentLoading && (
        <NavButtons
          nextPage={nextPage}
          prevPage={prevPage}
          currentPage={pageIndex}
          maxPage={data.locations.info.pages}
        />
      )}
      <Gallery
        pageIndex={pageIndex}
        setContentLoading={setContentLoading}
        type="Locations"
      />
      {data && !contentLoading && (
        <NavButtons
          nextPage={nextPage}
          prevPage={prevPage}
          currentPage={pageIndex}
          maxPage={data.locations.info.pages}
        />
      )}
    </>
  );
}
