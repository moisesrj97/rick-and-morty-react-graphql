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

export const EPISODES_PAGES_AMOUNT_QUERY = gql`
  query episodesPagesAmountQuery {
    episodes {
      info {
        pages
      }
    }
  }
`;

export function Episodes(): JSX.Element {
  const [pageIndex, setPageIndex] = useState(1);
  const [contentLoading, setContentLoading] = useState(true);
  const { data } = useQuery<EpisodesPagesAmountQueryI>(
    EPISODES_PAGES_AMOUNT_QUERY
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
          maxPage={data.episodes.info.pages}
        />
      )}
      <Gallery
        pageIndex={pageIndex}
        setContentLoading={setContentLoading}
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
