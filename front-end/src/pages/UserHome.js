import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const UserHome = () => {
  const [pin, setPin] = useState('');
  const [playerName, setPlayerName] = useState('');

  const handlePINChange = (event) => {
    setPin({
      ...pin,
      [event.target.name]: event.target.value,
    });
  };
  const handlePlayerNameChange = (event) => {
    setPlayerName({ ...playerName, [event.target.name]: event.target.value });
  };
  return (
    <React.Fragment>
      <div className="container">
        <input
          type="text"
          placeholder="Paste your PIN here"
          className="input-pin"
          onChange={handlePINChange}
          name="pin"
        ></input>
        <input
          type="text"
          placeholder="Select your playerName"
          className="input-nick"
          onChange={handlePlayerNameChange}
          name="playerName"
        ></input>

        <br />
        <br />
        <br />
        <br />

        <Link
          to={{
            pathname: '/user/lobby',
            state: [playerName, pin],
          }}
        >
          <Button className="btn-submit-data-user" type="submit" variant="primary">
            Send Data
          </Button>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default UserHome;
