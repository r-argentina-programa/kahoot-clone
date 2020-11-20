/* eslint-disable no-native-reassign */
import React from 'react';
import HostLobby from '../HostLobby';
import { BrowserRouter as Router } from 'react-router-dom';
import routeData from 'react-router';
import { render, screen } from '@testing-library/react';
import socketMock from 'socket.io-mock';
import { act } from 'react-dom/test-utils';

beforeEach(() => {
  jest.spyOn(routeData, 'useLocation').mockReturnValue({
    pathname: '/host/lobby',
    hash: '',
    search: '',
    state: '1',
  });
});

describe('<HostLobby />', () => {
  it('Saves a new trivia', () => {
    const socket = new socketMock();
    const setTriviaDataMock = jest.fn();
    const BASE_URL_MOCK = 'http://localhost:5000';
    const triviaDataMock = [];
    render(
      <Router>
        <HostLobby socket={socket} setTriviaData={setTriviaDataMock} BASE_URL={BASE_URL_MOCK} />
      </Router>
    );

    socket.socketClient.emit('question', triviaDataMock);

    expect(setTriviaDataMock).toHaveBeenCalledTimes(1);
    expect(setTriviaDataMock).toHaveBeenCalledWith([]);
  });

  it('updates the player list', () => {
    const socket = new socketMock();
    const setTriviaDataMock = jest.fn();
    const BASE_URL_MOCK = 'http://localhost:5000';
    const oldPlayerList = ['Nicolas'];
    const newPlayerList = ['Nicolas', 'Hernan', 'Leonel'];

    const { getByText } = screen;

    render(
      <Router>
        <HostLobby socket={socket} setTriviaData={setTriviaDataMock} BASE_URL={BASE_URL_MOCK} />
      </Router>
    );

    act(() => {
      socket.socketClient.emit('playerlist', oldPlayerList);
    });

    const player = getByText('Nicolas');

    expect(player).toBeInTheDocument();

    act(() => {
      socket.socketClient.emit('playerlist', newPlayerList);
    });

    const player1 = getByText('Nicolas');
    const player2 = getByText('Hernan');
    const player3 = getByText('Leonel');

    expect(player1).toBeInTheDocument();
    expect(player2).toBeInTheDocument();
    expect(player3).toBeInTheDocument();
  });

  it('Displays a pin', () => {
    const socket = new socketMock();
    const setTriviaDataMock = jest.fn();
    const BASE_URL_MOCK = 'http://localhost:5000';

    render(
      <Router>
        <HostLobby socket={socket} setTriviaData={setTriviaDataMock} BASE_URL={BASE_URL_MOCK} />
      </Router>
    );

    const { getByText, getByRole } = screen;

    const pin = getByText('The PIN is 1');
    const startGameButton = getByRole('button');

    expect(pin).toBeInTheDocument();
    expect(startGameButton).toBeInTheDocument();
  });

  it('Emits a trivia id', () => {
    const socketMock = { emit: jest.fn(), on: jest.fn() };
    const setTriviaDataMock = jest.fn();
    const BASE_URL_MOCK = 'http://localhost:5000';

    const { getByText } = screen;

    render(
      <Router>
        <HostLobby socket={socketMock} setTriviaData={setTriviaDataMock} BASE_URL={BASE_URL_MOCK} />
      </Router>
    );

    getByText('Start Game').click();

    expect(socketMock.emit).toHaveBeenCalledTimes(1);
    expect(socketMock.emit).toHaveBeenCalledWith('start-game');
  });
  it('Doesnt pass a socket to the component', () => {
    const setTriviaDataMock = jest.fn();
    const BASE_URL_MOCK = 'http://localhost:5000';
    render(
      <Router>
        <HostLobby setTriviaData={setTriviaDataMock} BASE_URL={BASE_URL_MOCK} />
      </Router>
    );
  });
  it('Doesnt pass a BASE_URL to the component', () => {
    const setTriviaDataMock = jest.fn();
    const BASE_URL_MOCK = 'http://localhost:5000';
    const trivia = null;

    render(
      <Router>
        <HostLobby trivia={trivia} setTriviaData={setTriviaDataMock} BASE_URL={BASE_URL_MOCK} />
      </Router>
    );
  });
});
