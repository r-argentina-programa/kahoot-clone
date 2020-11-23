import React, { useState } from 'react';
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
      <body className="masthead bg-primary">
        <div>
          <div className="container text-white mb-0 pb-2">
            <input
              className="form-control  m-1 bg-white"
              id="name"
              type="text"
              name="playerName"
              placeholder="Please select your nick"
              onChange={handlePlayerNameChange}
            />
            <input
              className="form-control  m-1 bg-white"
              id="name"
              type="text"
              name="pin"
              placeholder="Paste the PIN that the host gave you"
              onChange={handlePINChange}
            />
          </div>
          <div className="divider-custom">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>
          <div className="container">
            <Link
              to={{
                pathname: '/user/lobby',
                state: [playerName, pin],
              }}
            >
              <button type="submit" className="btn btn-xl btn-outline-light btn-submit-data-user">
                <i className="fas fa-download mr-2"></i>
                Go to the waiting room
              </button>
            </Link>
          </div>
        </div>
      </body>
    </React.Fragment>
  );
};

export default UserHome;
