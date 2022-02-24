import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Gallery } from '../../containers/Gallery/Gallery';
import { NavButtons } from '../../core/NavButtons/NavButtons';

interface LocationsPagesAmountQueryI {
  locations: {
    info: {
      pages: number;
    };
  };
}

interface LocationsPageAmountQueryVariablesI {
  filter: {
    name: string;
  };
}

export const LOCATIONS_PAGES_AMOUNT_QUERY = gql`
  query locationsPagesAmountQuery($filter: FilterLocation) {
    locations(filter: $filter) {
      info {
        pages
      }
    }
  }
`;

export function Locations({
  searchValue,
}: {
  searchValue: string;
}): JSX.Element {
  const [pageIndex, setPageIndex] = useState(1);
  const [contentLoading, setContentLoading] = useState(true);

  const { data } = useQuery<
    LocationsPagesAmountQueryI,
    LocationsPageAmountQueryVariablesI
  >(LOCATIONS_PAGES_AMOUNT_QUERY, {
    variables: { filter: { name: searchValue } },
  });

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
        searchValue={searchValue}
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
