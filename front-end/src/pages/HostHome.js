import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const HostHome = () => {
  return (
    <div>
      <Link to="/host/chooseTrivia">
        <Button variant="info">Create/start trivia</Button>
      </Link>
    </div>
  );
};

export default HostHome;
