import React from 'react';
import TriviaUser from '../TriviaUser';
import { render, screen } from '@testing-library/react';
import socketMock from 'socket.io-mock';
import { BrowserRouter } from 'react-router-dom';
describe('<TriviaUserUser />', () => {
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
        <TriviaUser
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
        <TriviaUser
          socketHost={socketHostMock}
          socketUser={socketUserMock}
          onGameEnd={onGameEnd}
          setSocketUser={setSocketUser}
          triviaData={triviaData}
          setSocket={setSocket}
        />
      </BrowserRouter>
    );
    screen.debug();
    expect(screen.getByText('JUPITER')).toBeInTheDocument();
    screen.getByText('JUPITER').click();
    socketUserMock.on('answer', (data) => {
      expect(data).toBeTruthy();
      expect(data).toBeFalsy();
    });

    socketHostMock.on('podium', (data) => {
      expect(data).toBeTruthy();
      expect(data).toBeDefined();
    });
  });
});
