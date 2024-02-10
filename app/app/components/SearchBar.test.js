import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SearchBar } from './SearchBar'; // Adjust the import path as necessary

describe('SearchBar', () => {
  it('renders icon and placeholder text', () => {
    const mockIcon = 'search';
    const mockPlaceholder = 'Search here';
    const { getByText } = render(<SearchBar icon={mockIcon} size={30} placeholder={mockPlaceholder} setSearch={() => { }} />);

    expect(getByText(mockPlaceholder)).toBeTruthy();
    // Testing for the icon might depend on how it's rendered. If it uses text, you can use getByText
  });

  it('handles search on press', () => {
    const setSearchMock = jest.fn();
    const { getByTestId } = render(<SearchBar icon="search" size={30} placeholder="Search here" setSearch={setSearchMock} />);

    const touchableArea = getByTestId('search-bar-touchable');
    fireEvent.press(touchableArea);

    expect(setSearchMock).toHaveBeenCalled();
  });

});
