import HostHome from '../HostHome';
import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Router>
        <HostHome />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
