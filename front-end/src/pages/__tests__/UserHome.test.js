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

    const pin = screen.getByPlaceholderText('Paste the PIN that the host gave you');
    const nick = screen.getByPlaceholderText('Please select your nick');

    fireEvent.change(pin, { target: { value: '5' } });
    fireEvent.change(nick, { target: { value: 'asdqwe' } });

    screen.getByText('Go to the waiting room').click();

    expect(pin.value).toEqual('5');
    expect(nick.value).toEqual('asdqwe');
  });
});
