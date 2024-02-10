import React from 'react';
import { render } from '@testing-library/react-native';
import { Default, UserList, LogsList } from './List';
import renderer from 'react-test-renderer';

jest.mock('./ImgSliderItems', () => 'ImgSliderItems');

describe('Default Component', () => {
  it('renders with title and secondary text', () => {
    const { getByText } = render(
      <Default title="Test Title" secondary="Test Secondary" />
    );
    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Secondary')).toBeTruthy();
  });

  test('renders icon correctly - Default', () => {
    const tree = renderer.create(
      <Default title="Test Title" icon="camera" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Additional tests for other prop combinations...
});

describe('UserList Component', () => {
  it('renders correctly with image and text props', () => {
    const { getByText } = render(
      <UserList
        title="User Title"
        secondary="User Secondary"
        image="http://example.com/image.jpg"
      />
    );

    expect(getByText('User Title')).toBeTruthy();
    expect(getByText('User Secondary')).toBeTruthy();
    // Additional checks for image rendering...
  });

  test('renders icon correctly - UserList', () => {
    const tree = renderer.create(
      <UserList
        title="User Title"
        secondary="User Secondary"
        image="http://example.com/image.jpg"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  // Additional tests...
});

describe('LogsList Component', () => {
  it('renders correctly with log data', () => {
    const { getByText } = render(
      <LogsList
        title="Log Title"
        message="Log Message"
        secondary="Log Secondary"
        amount="$100"
      />
    );

    expect(getByText('Log Title')).toBeTruthy();
    expect(getByText('Log Message')).toBeTruthy();
    expect(getByText('Log Secondary')).toBeTruthy();
    expect(getByText('$100')).toBeTruthy();
  });

  test('renders icon correctly - LogsList', () => {
    const tree = renderer.create(
      <LogsList
        title="Log Title"
        message="Log Message"
        secondary="Log Secondary"
        amount="$100"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  // Additional tests...
});
