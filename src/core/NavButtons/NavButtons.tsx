import React from 'react';

interface NavButtonPropsI {
  nextPage: () => void;
  prevPage: () => void;
  currentPage: number;
  maxPage: number;
}

export function NavButtons({
  nextPage,
  prevPage,
  currentPage,
  maxPage,
}: NavButtonPropsI): JSX.Element {
  return (
    <div className="flex w-full justify-center gap-10">
      {currentPage > 1 && (
        <button
          type="button"
          className="text-white p-4 border-2 text-xl rounded-md hover:shadow-green-400 hover:shadow-lg transition-all w-40"
          onClick={prevPage}
        >
          Prev
        </button>
      )}
      {currentPage < maxPage && (
        <button
          type="button"
          className="text-white p-4 border-2 text-xl rounded-md hover:shadow-green-400 hover:shadow-lg transition-all w-40"
          onClick={nextPage}
        >
          Next
        </button>
      )}
    </div>
  );
}
