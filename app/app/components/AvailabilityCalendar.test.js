jest.mock('./Button', () => ({
    BtnContain: 'BtnContain'
}));
jest.mock('./Counter', () => 'Counter');

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AvailabilityCalendar from './AvailabilityCalendar';

describe('AvailabilityCalendar', () => {
    it('renders correctly with initial data', () => {
        const testData = {
            '3021-01-01': {
                '09:00': [50, '', '', 'blocked'],
                // ... other timeslots
            },
            // ... other dates
        };
        const selectedSpace = {
            price: 10,
            peakPrice: 15,
            offPeakPrice: 8
        }
        const { getByText } = render(<AvailabilityCalendar data={testData} selectedSpace={selectedSpace} />);
        expect(getByText('01 Jan 21')).toBeTruthy();
        expect(getByText('(Monday)')).toBeTruthy();
        // Add more assertions as needed
    });

    // Additional tests...
    it('handles date selection', async () => {
        const setDatedEvents = jest.fn()
        const testData = {
            "3023-12-12": {
                "1702342800000": [20, ""],
                "1702346400000": [20, ""],
            }, "3023-12-13": {
                "1702425600000": [20, ""],
                "1702429200000": [20, ""],
            }, "3023-12-14": {
                "1702512000000": [20, ""],
                "1702515600000": [20, ""],
            }, "3023-12-15": {
                "1702598400000": [20, ""],
                "1702602000000": [20, ""],
            }
        }
        const selectedSpace = {
            price: 10,
            peakPrice: 15,
            offPeakPrice: 8
        }
        // Only renders latest date (if all test data is historical dates)
        const { getByTestId, getAllByTestId, queryByTestId } = render(<AvailabilityCalendar data={testData} setDatedEvents={setDatedEvents} selectedSpace={selectedSpace} />);
        expect(getByTestId('date-flatlist')).toBeDefined();

        // const dateElement = getByTestId('date-flatlist').props.renderItem(dateTestData);
        // // Matches current local date
        // expect(dateElement.props.children[0].props.children).toStrictEqual(new Date().toLocaleDateString('en-GB', {
        //     year: '2-digit',
        //     month: '2-digit',
        //     day: '2-digit'
        // }));

        // Simulate pressing a date
        const dateItems = getAllByTestId('date-item');
        fireEvent.press(dateItems[1]);

        // Simulate pressing a timeslot
        const timeslotItems = getAllByTestId('timeslot-item');
        fireEvent.press(timeslotItems[0]);

        const modal = getByTestId('modal');
        expect(modal).toBeTruthy();

        // Test confirm actions
        const confirmButton = getByTestId('confirm-button');
        fireEvent.press(confirmButton);
        // expect(queryByTestId('modal').props.visible).toBe(false); // old
        expect(queryByTestId('modal')).toBeNull();

        // //  write expect that values are updated
        //  expect(setDatedEvents).toHaveBeenCalledWith('data');

        // Simulate pressing a timeslot (again)
        fireEvent.press(timeslotItems[0]);
        expect(queryByTestId('modal').props.visible).toBe(true); // Assuming modal closes after cancel

        // Test cancel actions
        const cancelButton = getByTestId('cancel-button');
        fireEvent.press(cancelButton);
        // expect(queryByTestId('modal').props.visible).toBe(false); // old
        expect(queryByTestId('modal')).toBeNull();

        //  write expect that values are NOT updated
    });
});

// Needs more interaction / e2e tests here