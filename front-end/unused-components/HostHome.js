import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import '../styles/HostHome.css';

const HostHome = () => {
  return (
    <Container className="container centered">
      <Link to="/host/chooseTrivia">
        <Button className="to-trivia-select" variant="info">
          Create/start trivia
        </Button>
      </Link>
    </Container>
  );
};
export default HostHome;
