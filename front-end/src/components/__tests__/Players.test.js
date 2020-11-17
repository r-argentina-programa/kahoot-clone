import React from 'react';
import Players from '../Players';
import { render, screen } from '@testing-library/react';

it('Renders players correctly', () => {
  const playersMock = ['player1', 'player2'];
  render(<Players players={playersMock} />);
  expect(screen.getByText('player1')).toBeInTheDocument();
  expect(screen.getByText('player2')).toBeInTheDocument();
});

/*
const tree = renderer.create(<Players />).toJSON();
  expect(tree).toMatchSnapshot();
*/
