jest.mock('@expo/vector-icons/MaterialIcons', () => 'MaterialIcons');
jest.mock('./RecurTimePickerEditor', () => 'RecurTimePickerEditor');
jest.mock("./Button", () => ({ BtnContain: 'BtnContain' }));

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RuleMakerEditor from './RuleMakerEditor';

describe('RuleMakerEditor', () => {
  const mockRuleDays = [1, 2, 3]; // Example rule days
  const mockDefaultRules = { /* ... */ }; // Example default rules
  const onSubmitMock = jest.fn();

  it('renders correctly', () => {
    const { getByTestId } = render(
      <RuleMakerEditor
        ruleDays={mockRuleDays}
        defaultRules={mockDefaultRules}
        onSubmit={onSubmitMock}
      />
    );

    expect(getByTestId('time-picker-editor')).toBeTruthy();
    expect(getByTestId('submit-button')).toBeTruthy();
  });

  // Additional tests...
});
