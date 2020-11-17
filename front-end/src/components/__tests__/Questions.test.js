import React from 'react';
import Questions from '../Questions';
import { render, screen } from '@testing-library/react';

it('renders correctly', () => {
  const QuestionsMock = {
    pin: 1,
    question: ['Hi', 'Bye', 'Please hire me Martin', 'Just a joke :P'],
  };
  render(<Questions triviaData={QuestionsMock} />);
  screen.debug();
});
