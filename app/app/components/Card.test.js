import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Card from './Card'; // Adjust the import path as necessary

describe('Card Component', () => {
  const mockPress = jest.fn();
  const mockProps = {
    images: ["image1.jpg", "image2.jpg"],
    rating: "4.5",
    reviews: "200",
    subtitle: "20",
    title: "Test Title",
    onPress: mockPress,
  };

  it('renders correctly', () => {
    const { getByText } = render(<Card {...mockProps} />);
    expect(getByText(mockProps.title)).toBeTruthy();
    expect(getByText(`$${mockProps.subtitle}`)).toBeTruthy();
    expect(getByText(mockProps.rating)).toBeTruthy();
    expect(getByText(`(${mockProps.reviews})`)).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByTestId } = render(<Card {...mockProps} />);
    const touchable = getByTestId('cardTouchable');
    fireEvent.press(touchable);
    expect(mockPress).toHaveBeenCalled();
  });

  // Additional tests can be written for specific functionalities
});
