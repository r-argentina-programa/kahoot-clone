import React from 'react';
import Questions from '../Questions';
import { render, screen } from '@testing-library/react';

it('renders correctly', () => {
  const QuestionsMock = {
    pin: 1,
    question: ['hi'],
  };
  render(<Questions triviaData={QuestionsMock} />);
  expect(screen.getByText('hi')).toBeInTheDocument();
});
