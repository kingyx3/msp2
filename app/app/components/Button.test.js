jest.mock("@expo/vector-icons", () => ({
  FontAwesome: "FontAwesome",
  EvilIcons: "EvilIcons"
}));

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FontAwesome, EvilIcons } from "@expo/vector-icons";
import { BtnContain, BtnOutline, BtnText, BtnTxtUnderline, FloatingButton, BtnCircle, BtnDateTime } from './Button'; // Adjust the import path as necessary

describe('BtnContain', () => {
  it('renders correctly with required props', () => {
    const { getByText } = render(<BtnContain label="Test Label" />);
    expect(getByText('Test Label')).toBeTruthy();
  });

  it('handles onPress event', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<BtnContain label="Test Label" onPress={onPressMock} />);
    fireEvent.press(getByText('Test Label'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('renders with correct color', () => {
    const testColor = '#ff0000';
    const { getByTestId } = render(<BtnContain color={testColor} label="Test Label" />);
    const button = getByTestId('btn-contain-filled');
    expect(button.props.style).toContainEqual({ backgroundColor: testColor });
  });

  it('renders correctly when disabled', () => {
    const { getByTestId } = render(<BtnContain disabled label="Test Label" />);
    const button = getByTestId('btn-contain-touchable');
    expect(button.props.accessibilityState.disabled).toBe(true);
  });

  it('renders with an icon when provided', () => {
    const iconName = 'home';
    const { getByTestId } = render(<BtnContain icon={iconName} label="Test Label" />);
    const icon = getByTestId('btn-contain-icon');
    expect(icon.props.name).toBe(iconName);
  });

  it('renders with small size when specified', () => {
    const { getByText } = render(<BtnContain size="small" label="Test Label" />);
    expect(getByText('Test Label')).toBeTruthy(); // Add more specific checks for small size if needed
  });

  // Add more tests as necessary for other props or conditional rendering
});

describe('BtnOutline', () => {
  it('renders correctly', () => {
    const { getByText } = render(<BtnOutline label="Outline Button" />);
    expect(getByText('Outline Button')).toBeTruthy();
  });

  it('handles onPress', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<BtnOutline label="Outline Button" onPress={onPressMock} />);
    fireEvent.press(getByText('Outline Button'));
    expect(onPressMock).toHaveBeenCalled();
  });

  // Add tests for 'color', 'disabled', 'labelcolor' props if necessary
});

describe('BtnText', () => {
  it('renders correctly', () => {
    const { getByText } = render(<BtnText label="Text Button" />);
    expect(getByText('Text Button')).toBeTruthy();
  });

  it('handles onPress', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<BtnText label="Text Button" onPress={onPressMock} />);
    fireEvent.press(getByText('Text Button'));
    expect(onPressMock).toHaveBeenCalled();
  });

  // Add tests for 'color' prop if necessary
});

describe('BtnTxtUnderline', () => {
  it('renders correctly', () => {
    const { getByText } = render(<BtnTxtUnderline label="Underline Button" />);
    expect(getByText('Underline Button')).toBeTruthy();
  });

  it('handles onPress', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<BtnTxtUnderline label="Underline Button" onPress={onPressMock} />);
    fireEvent.press(getByText('Underline Button'));
    expect(onPressMock).toHaveBeenCalled();
  });

  // Add tests for 'color' prop if necessary
});

describe('FloatingButton', () => {
  it('renders correctly', () => {
    const { getByText } = render(<FloatingButton label="Floating Button" iconName="rocket" />);
    expect(getByText('Floating Button')).toBeTruthy();
  });

  it('handles onPress', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<FloatingButton label="Floating Button" iconName="rocket" onPress={onPressMock} />);
    fireEvent.press(getByText('Floating Button'));
    expect(onPressMock).toHaveBeenCalled();
  });

  // Add tests for 'iconName' prop if necessary
});

describe('BtnCircle', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<BtnCircle iconName="user" />);
    expect(getByTestId('btn-circle')).toBeTruthy();
  });

  it('handles onPress', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<BtnCircle iconName="user" onPress={onPressMock} />);
    fireEvent.press(getByTestId('btn-circle'));
    expect(onPressMock).toHaveBeenCalled();
  });

  // Add tests for 'iconName', 'size', 'color' props if necessary
});

describe('BtnDateTime', () => {
  const label = 'Test Date Time';
  const color = '#ff0000';
  const onPressMock = jest.fn();

  it('renders correctly with label and color', () => {
    const { getByText } = render(<BtnDateTime label={label} color={color} onPress={onPressMock} />);
    const labelText = getByText(label);
    expect(labelText).toBeTruthy();
    expect(labelText.props.style).toContainEqual({ color }); // Check if the color prop is applied correctly
  });

  it('handles onPress event', () => {
    const { getByText } = render(<BtnDateTime label={label} onPress={onPressMock} />);
    fireEvent.press(getByText(label));
    expect(onPressMock).toHaveBeenCalled();
  });

  // Add additional tests if you have more functionalities or conditions
});