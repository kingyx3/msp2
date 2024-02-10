jest.mock('@expo/vector-icons/MaterialIcons', () => 'MaterialIcons');

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TimePickerEditor from './RecurTimePickerEditor';

describe('TimePickerEditor', () => {
  const mockHours = { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1 };
  const onChangeMock = jest.fn();

  it('renders hour toggles', () => {
    const { getByText } = render(<TimePickerEditor hours={mockHours} onChange={onChangeMock} />);

    expect(getByText('12AM-1AM')).toBeTruthy();
    expect(getByText('1AM-2AM')).toBeTruthy();
    // Add checks for other hours
  });

  it('handles hour toggle press', () => {
    const { getByText } = render(<TimePickerEditor hours={mockHours} onChange={onChangeMock} />);

    const hourToggle = getByText('12AM-1AM');
    fireEvent.press(hourToggle);

    // Since the specific hour state logic is complex, you might want to
    // check if onChange is called or check the new state indirectly
    expect(onChangeMock).toHaveBeenCalled();
  });

});
