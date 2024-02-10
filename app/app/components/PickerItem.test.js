import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PickerItem from './PickerItem';

describe('PickerItem', () => {
  it('renders the label', () => {
    const label = 'Test Label';
    const { getByText } = render(<PickerItem label={label} />);

    expect(getByText(label)).toBeTruthy();
  });

  it('handles onPress event', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<PickerItem label="Test Label" onPress={onPressMock} />);

    const touchable = getByText('Test Label');
    fireEvent.press(touchable);

    expect(onPressMock).toHaveBeenCalled();
  });
});
