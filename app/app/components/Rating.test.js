jest.mock('@expo/vector-icons/FontAwesome', () => 'FontAwesome');

import React from 'react';
import { render } from '@testing-library/react-native';
import Rating from './Rating';

describe('Rating', () => {
  it('renders the rating and reviews', () => {
    const mockRating = 4.5;
    const mockReviews = 100;

    const { getByText } = render(<Rating rating={mockRating} reviews={mockReviews} />);

    expect(getByText(mockRating.toString())).toBeTruthy();
    expect(getByText(` (${mockReviews})`)).toBeTruthy();
  });

  it('renders the star icon', () => {
    const { getByTestId } = render(<Rating rating={4.5} reviews={100} />);

    expect(getByTestId('star-icon')).toBeTruthy();
  });

});
