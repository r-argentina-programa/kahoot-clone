import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

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
      <form method="POST" action="/pin">
        <div>
          <input
            type="text"
            placeholder="Paste your PIN here"
            className="form-control"
            onChange={handleInputChange}
            name="pin"
          ></input>
        </div>
        <Button type="submit" variant="primary">
          Send Data
        </Button>
      </form>
    </div>
  );
};

export default UserHome;
