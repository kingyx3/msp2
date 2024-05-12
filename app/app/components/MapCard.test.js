import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MapCard from './MapCard';

describe('MapCard', () => {
  const mockProps = {
    image: 'http://example.com/image.jpg',
    title: 'Test Title',
    subtitle: '123',
    description: 'abc',
    rating: 4.5,
    reviews: 10,
    property: 'Test Property'
  };

  it('renders correctly', () => {
    const { getByText } = render(<MapCard {...mockProps} />);

    expect(getByText(mockProps.title)).toBeTruthy();
    expect(getByText(`${mockProps.subtitle}`)).toBeTruthy();
    expect(getByText(`${mockProps.description}`)).toBeTruthy();
    expect(getByText(`${mockProps.rating}`)).toBeTruthy();
    expect(getByText(`(${mockProps.reviews})`)).toBeTruthy();
  });

  // Additional tests...
  it('handles onPress event', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<MapCard {...mockProps} onPress={onPressMock} />);

    const touchable = getByTestId('map-card-touchable');
    fireEvent.press(touchable);

    expect(onPressMock).toHaveBeenCalled();
  });

});
