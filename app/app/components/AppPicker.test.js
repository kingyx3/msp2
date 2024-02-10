import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AppPicker from './AppPicker'; // Adjust the import path as necessary

describe('AppPicker', () => {
  const items = [{ label: 'Item1', icon: 'icon1' }, { label: 'Item2', icon: 'icon2' }];

  it('renders correctly', () => {
    const { getByText } = render(<AppPicker placeholder="Select Item" items={items} />);
    expect(getByText('Select Item')).toBeTruthy();
  });

  it('opens modal on press', () => {
    const { getByText, queryByTestId } = render(<AppPicker placeholder="Select Item" items={items} />);
    fireEvent.press(getByText('Select Item'));
    // Check if the modal is open. This might require a specific query depending on your modal implementation
    expect(queryByTestId('close-modal')).toBeTruthy(); // Check if the close button is present, indicating the modal is open
  });

  it('closes modal on close press', () => {
    const { getByText, getByTestId, queryByTestId } = render(<AppPicker placeholder="Select Item" items={items} />);
    // Open the modal first
    fireEvent.press(getByText('Select Item'));
    // Now press the close button
    fireEvent.press(getByTestId('close-modal'));
    // Check if the modal is closed
    expect(queryByTestId('close-modal')).toBeNull(); // Check if the close button is absent, indicating the modal is closed
  });

  it('calls onSelectItem when an item is pressed', () => {
    const mockOnSelectItem = jest.fn();
    const { getByText } = render(<AppPicker placeholder="Select Item" items={items} onSelectItem={mockOnSelectItem} />);
    // Open the modal
    fireEvent.press(getByText('Select Item'));
    // Simulate item selection
    fireEvent.press(getByText('Item1'));
    expect(mockOnSelectItem).toHaveBeenCalledWith(items[0]);
  });
});