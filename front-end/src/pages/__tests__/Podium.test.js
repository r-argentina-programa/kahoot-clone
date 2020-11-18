import React from 'react';
import Podium from '../Podium';
import { render, screen } from '@testing-library/react';
import socketMock from 'socket.io-mock';
import { BrowserRouter } from 'react-router-dom';

describe('<Podium />', () => {
  const socket = new socketMock();
  it('displays the correct scoreboard', () => {
    const setSocketUser = jest.fn();
    const setSocket = jest.fn();
    const podium = { 0: { name: 'hernan', score: 10 }, 1: { name: 'hey', score: 8 } };
    render(
      <BrowserRouter>
        <Podium
          socket={socket}
          setSocket={setSocket}
          setSocketUser={setSocketUser}
          ranking={podium}
        />
      </BrowserRouter>
    );
    expect(screen.getByText(/hernan/)).toBeInTheDocument();
    expect(screen.getByText(/hey/)).toBeInTheDocument();
    expect(screen.getByText(/10/)).toBeInTheDocument();
    expect(screen.getByText(/8/)).toBeInTheDocument();
  });
});
