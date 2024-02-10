jest.mock('react-native-modal-datetime-picker', () => (props) => (
  props.isVisible ? (
    <mock-DateTimePickerModal
      testID="date-time-picker"
      onCancel={props.onCancel}
      onConfirm={props.onConfirm}
    />
  ) : null
));
jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
jest.mock('moment', () => () => ({ format: jest.fn().mockReturnValue('mocked time') }));

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import OpeningHours from './OpeningHours';

describe('OpeningHours', () => {
  const mockProps = {
    start: new Date(),
    end: new Date(),
    setStart: jest.fn(),
    setEnd: jest.fn(),
    fullDay: false,
    setFullDay: jest.fn(),
  };

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<OpeningHours {...mockProps} />);

    expect(getByText('Opening hours')).toBeTruthy();
    expect(getByText('Closing hours')).toBeTruthy();
    expect(getByTestId('start-button')).toBeTruthy();
    expect(getByTestId('end-button')).toBeTruthy();
    expect(getByTestId('full-day-button')).toBeTruthy();
  });

  // Additional tests...
  it('changes opening time and presses confirm', async () => {
    const newTime = new Date(2021, 1, 1, 9, 0); // Example new time
    const { getByTestId, findByTestId } = render(<OpeningHours {...mockProps} />);

    // Open the start time picker
    fireEvent.press(getByTestId('start-button'));

    // Wait for the DateTimePickerModal and simulate choosing a new time
    const datePicker = await findByTestId("date-time-picker");
    fireEvent(datePicker, 'onConfirm', newTime);

    // Expect setEnd to be called with the new time
    expect(mockProps.setStart).toHaveBeenCalledWith(newTime);
  });

  it('changes closing time and presses confirm', async () => {
    const newTime = new Date(2021, 1, 1, 17, 0); // Example new time
    const { getByTestId, findByTestId } = render(<OpeningHours {...mockProps} />);

    // Open the end time picker
    fireEvent.press(getByTestId('end-button'));

    // Wait for the DateTimePickerModal and simulate choosing a new time
    const datePicker = await findByTestId("date-time-picker");
    fireEvent(datePicker, 'onConfirm', newTime);

    // Expect setEnd to be called with the new time
    expect(mockProps.setEnd).toHaveBeenCalledWith(newTime);
  });

  it('handles full-day toggle', () => {
    const { getByTestId } = render(<OpeningHours {...mockProps} />);
    const fullDayButton = getByTestId('full-day-button');
    fireEvent.press(fullDayButton);
    expect(mockProps.setFullDay).toHaveBeenCalled();
  });
});
