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

  const sendPin = (event) => {
    event.preventDefault();
    console.log(pin);
  };
  return (
    <div>
      <form method="POST" action="/pin" onSubmit={sendPin}>
        <div>
          <input
            type="text"
            placeholder="Nombre"
            className="form-control"
            onChange={handleInputChange}
            name="nombre"
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
