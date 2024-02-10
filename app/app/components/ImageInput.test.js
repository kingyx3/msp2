jest.spyOn(Alert, 'alert');
jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
  MediaTypeOptions: jest.fn()
}));

import React from 'react';
import { act, render, fireEvent } from '@testing-library/react-native';
import ImageInput from './ImageInput'; // Adjust the import path as necessary
import { requestMediaLibraryPermissionsAsync, launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { Alert } from 'react-native';

describe('ImageInput Component', () => {
  beforeEach(() => {
    // Mock the permission request to always return 'granted'
    requestMediaLibraryPermissionsAsync.mockResolvedValue({ granted: true });
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<ImageInput />);
    expect(requestMediaLibraryPermissionsAsync).toHaveBeenCalled();
    expect(getByTestId("image-input-touchable")).toBeTruthy();
  });

  // it('renders correctly with no imageUri and no placeholder', () => {
  //   const { getByTestId } = render(<ImageInput />);
  //   expect(requestMediaLibraryPermissionsAsync).toHaveBeenCalled();
  //   expect(getByTestId('camera-icon')).toBeTruthy();
  // });

  // it('renders correctly with placeholder', () => {
  //   const placeholderValue = 'some-placeholder';
  //   const { getByTestId } = render(<ImageInput placeholder={placeholderValue} />);
  //   expect(requestMediaLibraryPermissionsAsync).toHaveBeenCalled();
  //   expect(getByTestId('placeholder-image')).toBeTruthy();
  // });

  // it('renders correctly with imageUri', () => {
  //   const imageUriValue = 'some-image-uri';
  //   const { getByTestId } = render(<ImageInput imageUri={imageUriValue} />);
  //   expect(requestMediaLibraryPermissionsAsync).toHaveBeenCalled();
  //   expect(getByTestId('selected-image')).toBeTruthy();
  // });

  // Additional tests...
  it('requests permissions on mount', async () => {
    requestMediaLibraryPermissionsAsync.mockResolvedValue({ granted: true });
    render(<ImageInput />);
    expect(requestMediaLibraryPermissionsAsync).toHaveBeenCalled();
  });

  it('handles press when there is no imageUri', async () => {
    launchImageLibraryAsync.mockResolvedValue({ canceled: false, assets: [{ uri: 'new/path/to/image' }] });
    const onChangeImageMock = jest.fn();
    const { getByTestId } = render(<ImageInput onChangeImage={onChangeImageMock} />);
    fireEvent.press(getByTestId('image-input-touchable'));

    await expect(launchImageLibraryAsync).toHaveBeenCalled();
    expect(onChangeImageMock).toHaveBeenCalledWith('new/path/to/image');
  });

  it('alerts for image deletion confirmation when an imageUri is present', () => {
    const onChangeImageMock = jest.fn();
    const imageUri = 'path/to/image';

    const { getByTestId } = render(<ImageInput imageUri={imageUri} onChangeImage={onChangeImageMock} />);
    fireEvent.press(getByTestId('image-input-touchable'));

    expect(Alert.alert).toHaveBeenCalledWith(
      'Delete',
      'Are you sure you want to delete photo?',
      expect.anything() // You can further specify the expected buttons if needed
    );
  });

  // it('handles the scenario when permission is not granted (imageUri present)', async () => {
  //   // Mock the permission request to return 'not granted'
  //   requestMediaLibraryPermissionsAsync.mockResolvedValue({ granted: false });
  //   const onChangeImageMock = jest.fn();
  //   const { getByTestId } = render(<ImageInput imageUri={imageUri} onChangeImage={onChangeImageMock} />);
  //   fireEvent.press(getByTestId('image-input-touchable'));
  //   // Check if an Alert.alert is expected to be called
  //   expect(Alert.alert).toHaveBeenCalledWith("Permission required");
  // });

  // it('handles the scenario when permission is not granted (imageUri not present)', async () => {
  //   // Mock the permission request to return 'not granted'
  //   requestMediaLibraryPermissionsAsync.mockResolvedValue({ granted: false });
  //   const onChangeImageMock = jest.fn();
  //   const { getByTestId } = render(<ImageInput onChangeImage={onChangeImageMock} />);
  //   fireEvent.press(getByTestId('image-input-touchable'));
  //   // Check if an Alert.alert is expected to be called
  //   expect(Alert.alert).toHaveBeenCalledWith("Permission required");
  // });

  // ... other tests ...

});