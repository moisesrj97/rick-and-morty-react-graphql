import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './SearchBar';

describe('Given SearchBar component', () => {
  test('it should render and call given function when interacted', () => {
    const setSearchValueMock = jest.fn();
    render(<SearchBar setSearchValue={setSearchValueMock} />);
    userEvent.click(screen.getByRole('textbox'));
    userEvent.keyboard('Rick Sanchez');
    expect(setSearchValueMock).toHaveBeenCalledWith('Rick Sanchez');
  });
});
