import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const UserHome = () => {
  const [pin, setPin] = useState('');

  const handleInputChange = (event) => {
    // console.log(event.target.name)
    // console.log(event.target.value)
    setPin({
      ...pin,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Paste your PIN here"
          className="form-control"
          onChange={handleInputChange}
          name="pin"
        ></input>
        <br />
        <br />
        <br />
        <br />
      </div>
      <Link
        to={{
          pathname: '/user/lobby',
          state: pin,
        }}
      >
        <Button type="submit" variant="primary">
          Send Data
        </Button>
      </Link>
    </div>
  );
};

export default UserHome;
