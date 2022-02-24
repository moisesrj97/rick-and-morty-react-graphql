import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Gallery } from '../../containers/Gallery/Gallery';
import { NavButtons } from '../../core/NavButtons/NavButtons';

interface EpisodesPagesAmountQueryI {
  episodes: {
    info: {
      pages: number;
    };
  };
}

interface EpisodesPageAmountQueryVariablesI {
  filter: {
    name: string;
  };
}

export const EPISODES_PAGES_AMOUNT_QUERY = gql`
  query episodesPagesAmountQuery($filter: FilterEpisode) {
    episodes(filter: $filter) {
      info {
        pages
      }
    }
  }
`;

export function Episodes({
  searchValue,
}: {
  searchValue: string;
}): JSX.Element {
  const [pageIndex, setPageIndex] = useState(1);
  const [contentLoading, setContentLoading] = useState(true);

  const { data } = useQuery<
    EpisodesPagesAmountQueryI,
    EpisodesPageAmountQueryVariablesI
  >(EPISODES_PAGES_AMOUNT_QUERY, {
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
          maxPage={data.episodes.info.pages}
        />
      )}
      <Gallery
        pageIndex={pageIndex}
        setContentLoading={setContentLoading}
        searchValue={searchValue}
        type="Episodes"
      />
      {data && !contentLoading && (
        <NavButtons
          nextPage={nextPage}
          prevPage={prevPage}
          currentPage={pageIndex}
          maxPage={data.episodes.info.pages}
        />
      )}
    </>
  );
}
