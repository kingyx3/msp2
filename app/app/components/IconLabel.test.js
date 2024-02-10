import React from 'react';
import { render } from '@testing-library/react-native';
import { FA, MCI } from './IconLabel'; // Replace with your actual file name

describe('FA Component', () => {
  const mockProps = {
    icon: 'star',
    label: 'Test Label',
    label2: 'Additional Info',
    color: 'blue',
    qty: 5
  };

  it('renders correctly with all props', () => {
    const { getByText } = render(<FA {...mockProps} />);
    expect(getByText(`${mockProps.qty} ${mockProps.label}`)).toBeTruthy();
    if (mockProps.label2) {
      expect(getByText(mockProps.label2)).toBeTruthy();
    }
  });

  it('renders correctly without label2', () => {
    const { queryByText } = render(<FA {...mockProps} label2={null} />);
    expect(queryByText(mockProps.label2)).toBeNull();
  });
});

describe('MCI Component', () => {
  const mockProps = {
    icon: 'camera',
    label: 'Test Label',
    label2: 'Additional Info',
    color: 'green'
  };

  it('renders correctly with all props', () => {
    const { getByText } = render(<MCI {...mockProps} />);
    expect(getByText(mockProps.label)).toBeTruthy();
    if (mockProps.label2) {
      expect(getByText(mockProps.label2)).toBeTruthy();
    }
  });

  it('renders correctly without label2', () => {
    const { queryByText } = render(<MCI {...mockProps} label2={null} />);
    expect(queryByText(mockProps.label2)).toBeNull();
  });
});
