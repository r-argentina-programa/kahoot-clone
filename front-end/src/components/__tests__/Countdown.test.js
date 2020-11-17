import React from 'react';
import Countdown from '../Countdown';
import { render, screen } from '@testing-library/react';
import socketMock from 'socket.io-mock';
import { act } from 'react-dom/test-utils';

describe('<Countdown />', () => {
  it('Fails to display the seconds remaining', () => {
    render(<Countdown socket={null} />);
  });

  it('Renders data correctly', async () => {
    const socket = new socketMock();
    const mockData = 6;

    render(<Countdown socket={socket} />);

    act(() => {
      socket.socketClient.emit('timer', mockData);
    });

    expect(screen.getByText(/You have/)).toBeInTheDocument();
  });

  it('Shows you ran out of time', async () => {
    const socket = new socketMock();
    const mockData = 0;

    render(<Countdown socket={socket} />);

    act(() => {
      socket.socketClient.emit('timer', mockData);
    });
    expect(screen.getByText('You dont have any more time')).toBeInTheDocument();
  });
});
