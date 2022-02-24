import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Gallery } from '../../containers/Gallery/Gallery';
import { NavButtons } from '../../core/NavButtons/NavButtons';

interface CharactersPagesAmountQueryI {
  characters: {
    info: {
      pages: number;
    };
  };
}

interface CharactersPageAmountQueryVariablesI {
  filter: {
    name: string;
  };
}

export const CHARACTERS_PAGES_AMOUNT_QUERY = gql`
  query charactersPagesAmountQuery($filter: FilterCharacter) {
    characters(filter: $filter) {
      info {
        pages
      }
    }
  }
`;

export function Characters({
  searchValue,
}: {
  searchValue: string;
}): JSX.Element {
  const [pageIndex, setPageIndex] = useState(1);
  const [contentLoading, setContentLoading] = useState(true);
  const { data } = useQuery<
    CharactersPagesAmountQueryI,
    CharactersPageAmountQueryVariablesI
  >(CHARACTERS_PAGES_AMOUNT_QUERY, {
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
          maxPage={data.characters.info.pages}
        />
      )}
      <Gallery
        pageIndex={pageIndex}
        setContentLoading={setContentLoading}
        searchValue={searchValue}
        type="Characters"
      />
      {data && !contentLoading && (
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
