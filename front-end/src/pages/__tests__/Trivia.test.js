import React from 'react';
import Trivia from '../Trivia';
import { render, screen } from '@testing-library/react';
import socketMock from 'socket.io-mock';

describe('<Trivia />', () => {
  const socketHostMock = new socketMock();
  const onGameEnd = jest.fn();
  const setSocketUser = jest.fn();
  const setSocket = jest.fn();
  const triviaData =
  render(
    <Trivia
      socketHost={socketHostMock}
      onGameEnd={onGameEnd}
      triviaData={triviaData}
      setSocketUser={setSocketUser}
      setSocket={setSocket}
    />
  );
});
