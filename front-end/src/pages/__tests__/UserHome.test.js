import React from 'react';
import UserHome from '../UserHome';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('<UserHome />', () => {
  it('does something', () => {
    render(
      <BrowserRouter>
        <UserHome />
      </BrowserRouter>
    );

    const pin = screen.getByPlaceholderText('Paste your PIN here');
    const nick = screen.getByPlaceholderText('Select your playerName');

    fireEvent.change(pin, { target: { value: '5' } });
    fireEvent.change(nick, { target: { value: 'asdqwe' } });

    screen.getByText('Send Data').click();
    
    expect(pin.value).toEqual('5');
    expect(nick.value).toEqual('asdqwe');
  });
});
