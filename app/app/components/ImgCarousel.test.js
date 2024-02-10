jest.mock('./ImgSliderItems', () => 'ImgSliderItem');

import React from 'react';
import { render } from '@testing-library/react-native';
import ImgCarousel from './ImgCarousel';

describe('ImgCarousel', () => {
  it('renders the correct number of image items', () => {
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    const { getAllByTestId } = render(<ImgCarousel images={images} />);

    const renderedImages = getAllByTestId('image-slider-item');
    expect(renderedImages.length).toBe(images.length);
  });

  // Additional tests...
});
