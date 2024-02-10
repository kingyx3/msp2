import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DeleteItem from './DeleteItem'; // Adjust the import path as necessary

describe('DeleteItem Component', () => {
  const mockOnPress = jest.fn();

  it('renders correctly', () => {
    const { getByText } = render(<DeleteItem onPress={mockOnPress} />);
    expect(getByText('Delete')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByText } = render(<DeleteItem onPress={mockOnPress} />);
    const deleteButton = getByText('Delete');
    fireEvent.press(deleteButton);
    expect(mockOnPress).toHaveBeenCalled();
  });
});