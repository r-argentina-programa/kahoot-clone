import React from 'react';
import Questions from '../Questions';
import { render, screen } from '@testing-library/react';

it('renders correctly', () => {
  const QuestionsMock = {
    pin: 1,
    question: ['Hi', 'Bye', 'Blue', 'Red'],
  };
  render(<Questions triviaData={QuestionsMock} />);
  screen.getAllByText(/Hi/);
});
