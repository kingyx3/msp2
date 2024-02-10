import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Counter from './Counter'; // Adjust the import path as necessary

describe('Counter Component', () => {
  const mockOnMinus = jest.fn();
  const mockOnPlus = jest.fn();

  it('renders correctly', () => {
    const { getByText } = render(<Counter result={5} onMinus={mockOnMinus} onPlus={mockOnPlus} max={10} />);
    expect(getByText('5')).toBeTruthy();
  });

  it('does not call onMinus when result is 0', () => {
    const { getByTestId } = render(<Counter result={0} onMinus={mockOnMinus} onPlus={mockOnPlus} max={12} />);
    const minusButton = getByTestId('minus-btn');
    fireEvent.press(minusButton);
    expect(mockOnMinus).not.toHaveBeenCalled();
  });

  it('does not call onPlus when result is at max', () => {
    const { getByTestId } = render(<Counter result={12} onMinus={mockOnMinus} onPlus={mockOnPlus} max={12} />);
    const plusButton = getByTestId('plus-btn');
    fireEvent.press(plusButton);
    expect(mockOnPlus).not.toHaveBeenCalled();
  });

  it('calls onMinus when minus button is pressed', () => {
    const { getByTestId } = render(<Counter result={4} onMinus={mockOnMinus} onPlus={mockOnPlus} max={15} />);
    const minusButton = getByTestId('minus-btn');
    fireEvent.press(minusButton);
    expect(mockOnMinus).toHaveBeenCalledWith(3);
  });

  it('calls onPlus when plus button is pressed', () => {
    const { getByTestId } = render(<Counter result={6} onMinus={mockOnMinus} onPlus={mockOnPlus} max={15} />);
    const plusButton = getByTestId('plus-btn');
    fireEvent.press(plusButton);
    expect(mockOnPlus).toHaveBeenCalledWith(7);
  });
});
