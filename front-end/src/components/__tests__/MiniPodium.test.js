import React from 'react';
import MiniPodium from '../MiniPodium';
import { render, screen } from '@testing-library/react';
import socketMock from 'socket.io-mock';
import { act } from 'react-dom/test-utils';

describe('<MiniPodium />', () => {
  it('Renders loading text correctly', () => {
    render(<MiniPodium socketHost={null} />);
    expect(screen.queryByText(/Waiting/)).toBeInTheDocument();
  });

  it('Renders data correctly', () => {
    const socket = new socketMock();
    const mockData = [
      { option: 1, count: 1 },
      { option: 2, count: 0 },
    ];

    render(<MiniPodium socketHost={socket} />);

    act(() => {
      socket.socketClient.emit('mini-podium', mockData);
    });
    expect(screen.getByText('Question 1', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Question 2', { exact: false })).toBeInTheDocument();
  });
});
