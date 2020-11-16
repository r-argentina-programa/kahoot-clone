import React from 'react';
import Players from '../Players';
import { render, screen } from '@testing-library/react';

it('renders correctly', () => {
  const playersMock = ['player1', 'player2'];
  render(<Players players={playersMock} />);
  screen.debug();
});

/*
const tree = renderer.create(<Players />).toJSON();
  expect(tree).toMatchSnapshot();
*/
