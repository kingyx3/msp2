jest.mock('../components/Button', () => ({ BtnCircle: 'BtnCircle' }));
jest.mock('./ImgSliderItems', () => 'ImgSliderItems');

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavBar, NavBar2, NolineNavBar, NavBarChat } from './NavBar'; // Adjust the path as needed

describe('NavBar Components', () => {
  // Test for NavBar
  it('renders NavBar correctly', () => {
    const mockTitle = 'Test Title';
    const { getByText } = render(<NavBar title={mockTitle} />);
    expect(getByText(mockTitle)).toBeTruthy();
  });

  it('handles onPress event in NavBar', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<NavBar onPress={onPressMock} />);

    const backButton = getByTestId('back-button');
    fireEvent.press(backButton);

    expect(onPressMock).toHaveBeenCalled();
  });
});

// Similar tests for NavBar2, NolineNavBar, NavBarChat
describe('NavBar2 Components', () => {
  // Test for NavBar2
  it('renders NavBar2 correctly', () => {
    const mockTitle = 'Test Title';
    const { getByText } = render(<NavBar2 title={mockTitle} />);
    expect(getByText(mockTitle)).toBeTruthy();
  });

  it('handles onPress event in NavBar2', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<NavBar2 onPress={onPressMock} />);

    const backButton = getByTestId('back-button2');
    fireEvent.press(backButton);

    expect(onPressMock).toHaveBeenCalled();
  });
});

describe('NolineNavBar Components', () => {
  // Test for NolineNavBar
  it('renders NolineNavBar correctly', () => {
    const mockTitle = 'Test Title';
    const { getByText } = render(<NolineNavBar title={mockTitle} />);
    expect(getByText(mockTitle)).toBeTruthy();
  });

  it('handles onPress event in NolineNavBar', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<NolineNavBar onPress={onPressMock} />);

    const backButton = getByTestId('back-button3');
    fireEvent.press(backButton);

    expect(onPressMock).toHaveBeenCalled();
  });
});

describe('NavBarChat Components', () => {
  // Test for NavBarChat
  it('renders NavBarChat correctly', () => {
    const mockTitle = 'Test Title';
    const { getByText } = render(<NavBarChat name={mockTitle} />);
    expect(getByText(mockTitle)).toBeTruthy();
  });

  it('handles onPress event in NavBarChat', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<NavBarChat onPress={onPressMock} />);

    const backButton = getByTestId('back-button4');
    fireEvent.press(backButton);

    expect(onPressMock).toHaveBeenCalled();
  });
});