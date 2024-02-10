jest.mock('expo-image', () => ({
  Image: 'Image'
}));

import React from 'react';
import { render } from '@testing-library/react-native';
import ImgSlider from './ImgSlider';

describe('ImgSlider', () => {
  it('renders the correct number of images', () => {
    const data = [
      'image-url-1',
      'image-url-2',
      'image-url-3'
    ];

    const { getAllByTestId } = render(<ImgSlider data={data} />);

    const images = getAllByTestId("image-component");
    expect(images.length).toBe(data.length);
  });

  // Additional tests...
});
