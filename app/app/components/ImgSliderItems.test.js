jest.mock('expo-image', () => ({
  Image: 'Image'
}));

import React from 'react';
import { render } from '@testing-library/react-native';
import ImgSliderItems from './ImgSliderItems';

describe('ImgSliderItems', () => {
  it('renders correctly with a source prop', () => {
    const source = 'http://example.com/image.jpg';
    const { getByTestId } = render(<ImgSliderItems source={source} />);

    const imageComponent = getByTestId('image-component');
    expect(imageComponent.props.source).toBe(source);
  });

  // Additional tests...
});
