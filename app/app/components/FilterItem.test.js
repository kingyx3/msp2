import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FilterItem from './FilterItem'; // Adjust the import path as necessary

describe('FilterItem Component', () => {
  const mockOnPress = jest.fn();
  const mockLabel = 'Test Label';

  it('renders correctly', () => {
    const { getByText } = render(<FilterItem label={mockLabel} onPress={mockOnPress} />);
    expect(getByText(mockLabel)).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByText } = render(<FilterItem label={mockLabel} onPress={mockOnPress} />);
    const button = getByText(mockLabel);
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalled();
  });
});
