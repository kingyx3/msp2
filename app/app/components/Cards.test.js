import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { QuickSearch, Default, Review } from './Cards'; // Replace with your actual file name

describe('QuickSearch Component', () => {
  const mockOnPress = jest.fn();
  const mockProps = {
    title: 'Title',
    secondary: 'Secondary text',
    onPress: mockOnPress,
  };

  it('renders correctly', () => {
    const { getByText } = render(<QuickSearch {...mockProps} />);
    expect(getByText(mockProps.title)).toBeTruthy();
    expect(getByText(mockProps.secondary)).toBeTruthy();
  });

  it('handles onPress', () => {
    const { getByText } = render(<QuickSearch {...mockProps} />);
    fireEvent.press(getByText(mockProps.title));
    expect(mockOnPress).toHaveBeenCalled();
  });
});


describe('Default Component', () => {
  const mockOnPress = jest.fn();
  const mockProps = {
    title: 'Title',
    secondary: 'Secondary text',
    onPress: mockOnPress,
    action: true
    // other props as necessary
  };

  it('renders correctly', () => {
    const { getByText } = render(<Default {...mockProps} />);
    expect(getByText(mockProps.title)).toBeTruthy();
    // Check for other elements based on props
  });

  it('handles onPress', () => {
    const { getByTestId } = render(<Default {...mockProps} />);
    fireEvent.press(getByTestId('cardsTouchable')); // Adjust text if necessary
    expect(mockOnPress).toHaveBeenCalled();
  });
});


describe('Review Component', () => {
  const mockProps = {
    title: 'Title',
    secondary: 'Secondary text',
    content: 'Content text',
    rating: 4.5,
    // other props as necessary
  };

  it('renders correctly', () => {
    const { getByText } = render(<Review {...mockProps} />);
    expect(getByText(mockProps.title)).toBeTruthy();
    expect(getByText(mockProps.secondary)).toBeTruthy();
    expect(getByText(mockProps.content)).toBeTruthy();
    expect(getByText(`${mockProps.rating.toFixed(2)}`)).toBeTruthy();
  });

  // Test for cases where rating is not provided
  it('renders without rating', () => {
    const { queryByText } = render(<Review {...mockProps} rating={null} />);
    expect(queryByText(`${mockProps.rating.toFixed(2)}`)).toBeNull();
  });
});
