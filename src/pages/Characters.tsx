import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Gallery } from '../containers/Gallery';
import { NavButtons } from '../core/NavButtons';

interface CharactersPagesAmountQueryI {
  characters: {
    info: {
      pages: number;
    };
  };
}

const CHARACTERS_PAGES_AMOUNT_QUERY = gql`
  query charactersPagesAmountQuery {
    characters {
      info {
        pages
      }
    }
  }
`;

export function Characters(): JSX.Element {
  const [pageIndex, setPageIndex] = useState(1);
  const { data } = useQuery<CharactersPagesAmountQueryI>(
    CHARACTERS_PAGES_AMOUNT_QUERY
  );

  const nextPage = (): void => {
    setPageIndex(pageIndex + 1);
  };

  const prevPage = (): void => {
    setPageIndex(pageIndex - 1);
  };

  return (
    <>
      {data && (
        <NavButtons
          nextPage={nextPage}
          prevPage={prevPage}
          currentPage={pageIndex}
          maxPage={data.characters.info.pages}
        />
      )}
      <Gallery pageIndex={pageIndex} />
      {data && (
        <NavButtons
          nextPage={nextPage}
          prevPage={prevPage}
          currentPage={pageIndex}
          maxPage={data.characters.info.pages}
        />
      )}
    </>
  );
}
