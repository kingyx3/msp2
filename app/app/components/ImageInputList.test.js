jest.spyOn(Alert, 'alert');
jest.mock('../components/ImageInput', () => 'ImageInput');
jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
  MediaTypeOptions: jest.fn()
}));

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ImageInputList from './ImageInputList';
import { Alert } from 'react-native';
import { requestMediaLibraryPermissionsAsync, launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';

describe('ImageInputList', () => {
  it('renders a list of image inputs for each imageUri', () => {
    const imageUris = ['uri1', 'uri2'];
    const { getAllByTestId } = render(<ImageInputList imageUris={imageUris} />);

    const imageInputs = getAllByTestId("image-input");
    expect(imageInputs.length).toBe(imageUris.length);
  });

  it('renders an image input for adding new images', () => {
    const imageUris = ['uri1', 'uri2'];
    const { getByTestId } = render(<ImageInputList imageUris={imageUris} />);

    const imageInput = getByTestId("image-input-touchable");
    expect(imageInput).toBeTruthy();
  });

  // Tests below should be done at the Image Input level

  // it('allows a new image to be added', async () => {
  //   const handleAddImage = jest.fn();
  //   launchImageLibraryAsync.mockResolvedValue({ canceled: false, assets: [{ uri: 'new-image-uri' }] });

  //   const { getByTestId } = render(<ImageInputList onAddImage={handleAddImage} />);
  //   const addButton = getByTestId('image-input-touchable'); // Assuming the last one is for adding images
  //   fireEvent.press(addButton);

  //   expect(launchImageLibraryAsync).toHaveBeenCalled();
  //   expect(handleAddImage).toHaveBeenCalledWith('new-image-uri');
  // });

  // it('allows an existing image to be removed', () => {
  //   const handleRemoveImage = jest.fn();
  //   const imageUris = ['uri1'];
  //   const { getAllByTestId } = render(<ImageInputList imageUris={imageUris} onRemoveImage={handleRemoveImage} />);

  //   const removeButton = getAllByTestId('image-input-touchable')[0]; // Assuming the first one is for existing images
  //   fireEvent.press(removeButton);

  //   expect(handleRemoveImage).toHaveBeenCalledWith('uri1');
  // });
});
