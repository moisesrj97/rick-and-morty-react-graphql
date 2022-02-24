import React, { SyntheticEvent, useState } from 'react';

export function SearchBar({
  setSearchValue,
}: {
  setSearchValue: (searchValue: string) => void;
}): JSX.Element {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = (e: SyntheticEvent): void => {
    const searchValue = (e.target as HTMLInputElement).value;
    setInputValue(searchValue);
    setSearchValue(searchValue);
  };

  return (
    <div className="flex justify-center mb-3">
      <input
        className="bg-transparent text-white border border-white rounded-md p-3"
        type="text"
        onChange={handleSearch}
        value={inputValue}
      />
    </div>
  );
}
