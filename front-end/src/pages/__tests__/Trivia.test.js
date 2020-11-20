import React from 'react';
import Trivia from '../Trivia';
import { render, screen } from '@testing-library/react';
import socketMock from 'socket.io-mock';
import { BrowserRouter } from 'react-router-dom';

describe('<Trivia />', () => {
  it('Makes sure the question and answers are rendered', () => {
    const socketHostMock = new socketMock();
    const onGameEnd = jest.fn();
    const setSocketUser = jest.fn();
    const setSocket = jest.fn();
    const triviaData = {
      question: 'Which is the biggest planet in the Solar System?',
      options: [
        { id: 1, description: 'Venus' },
        { id: 2, description: 'JUPITER' },
        { id: 3, description: 'Mars' },
      ],
    };
    render(
      <BrowserRouter>
        <Trivia
          socketHost={socketHostMock}
          onGameEnd={onGameEnd}
          triviaData={triviaData}
          setSocketUser={setSocketUser}
          setSocket={setSocket}
        />
      </BrowserRouter>
    );
    expect(screen.getByText(/Venus/)).toBeInTheDocument();
    expect(
      screen.getByText('Which is the biggest planet in the Solar System?')
    ).toBeInTheDocument();
  });

  it('Fails because theres no trivia data', () => {
    const socketHostMock = new socketMock();

    const onGameEnd = jest.fn();
    const setSocketUser = jest.fn();
    const setSocket = jest.fn();
    render(
      <BrowserRouter>
        <Trivia
          socketHost={socketHostMock}
          onGameEnd={onGameEnd}
          setSocketUser={setSocketUser}
          setSocket={setSocket}
        />
      </BrowserRouter>
    );
  });

  it('Makes sure next-question is emitted when clicking "Next" button', () => {
    const socketHostMock = new socketMock();
    const socketUserMock = new socketMock();
    const onGameEnd = jest.fn();
    const setSocketUser = jest.fn();
    const setSocket = jest.fn();
    const triviaData = {
      question: 'Which is the biggest planet in the Solar System?',
      options: [
        { id: 1, description: 'Venus' },
        { id: 2, description: 'JUPITER' },
        { id: 3, description: 'Mars' },
      ],
    };
    render(
      <BrowserRouter>
        <Trivia
          socketHost={socketHostMock}
          onGameEnd={onGameEnd}
          setSocketUser={setSocketUser}
          triviaData={triviaData}
          setSocket={setSocket}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('Next')).toBeInTheDocument();
    screen.getByText('Next').click();
    socketUserMock.on('next-question', (data) => {
      expect(data).toBeDefined();
    });
  });
});
