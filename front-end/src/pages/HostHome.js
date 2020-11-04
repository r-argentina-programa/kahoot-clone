import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const HostHome = () => {
  return (
    <div>
      <Link basename="/host" to="/chooseTrivia">
        <Button variant="info">Create/start trivia</Button>
      </Link>
    </div>
  );
};

export default HostHome;
