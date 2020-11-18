import React from 'react';
import TriviaUser from '../TriviaUser';
import { render, screen } from '@testing-library/react';
import socketMock from 'socket.io-mock';
import { BrowserRouter } from 'react-router-dom';
describe('<TriviaUserUser />', () => {
  it('Makes sure the question and answers are rendered', () => {
    const socket = new socketMock();
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
          socketHost={socket}
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
    const socketHost = new socketMock();
    const socketUser = new socketMock();
    const onGameEnd = jest.fn();
    const setSocketUser = jest.fn();
    const setSocket = jest.fn();
    const podiumMock = [{ name: 'Nicolas', score: 30 }];

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
          socketHost={socketHost}
          socketUser={socketUser}
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

    socketHost.on('answer', (data) => {
      expect(data).toBeTruthy();
      expect(data).toBeDefined();
    });

    socketUser.socketClient.emit('podium', podiumMock);

    expect(onGameEnd).toHaveBeenCalledTimes(1);
  });
});

//
