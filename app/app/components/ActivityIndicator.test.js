import React from 'react';
import { render } from '@testing-library/react-native';
import ActivityIndicator from './ActivityIndicator';

describe('ActivityIndicator', () => {
    it('renders correctly', () => {
        const { getByTestId } = render(<ActivityIndicator />);
        expect(getByTestId('activity-indicator')).toBeTruthy();
    });

    it('has a small size and blue color for the ActivityIndicator', () => {
        const { getByTestId } = render(<ActivityIndicator />);
        const activityIndicator = getByTestId('activity-indicator');
        expect(activityIndicator.props.size).toBe('small');
        expect(activityIndicator.props.color).toBe('#0000ff');
    });
});