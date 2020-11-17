import React from 'react';
import StopGame from '../StopGame';
import { render, screen } from '@testing-library/react';
import SocketMock from 'socket.io-mock';
import { BrowserRouter } from 'react-router-dom';

it('renders correctly', () => {
  const socket = new SocketMock();
  render(
    <BrowserRouter>
      <StopGame setSocketUser={jest.fn()} setSocket={jest.fn()} socket={socket} />
    </BrowserRouter>
  );
  screen.getByText('Go back to the Lobby').click();
  
});
