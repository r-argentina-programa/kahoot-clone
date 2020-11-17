import React from 'react';
import StartGame from '../StartGame';
import { render, screen } from '@testing-library/react';
import SocketMock from 'socket.io-mock';
import { BrowserRouter } from 'react-router-dom';

it('renders correctly', () => {
  const socket = new SocketMock();
  render(
    <BrowserRouter>
      <StartGame socket={socket} />
    </BrowserRouter>
  );
  expect(screen.getByText('Start Game')).toBeInTheDocument();
  expect(screen.getByText('Start Game')).toHaveAttribute('type', 'button');
  screen.getByText('Start Game').click();
});
