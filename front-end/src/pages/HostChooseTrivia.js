import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import '../styles/HostChooseTrivia.css';
const HostChooseTrivia = () => {
  return (
    <div>
      <div className="containerTriviaButton">
        <Button className="triviaButton" variant="dark">
          Trivia 1
        </Button>
        <Button className="triviaButton" variant="dark">
          Trivia 2
        </Button>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Link to="/host/lobby">
        <Button className="triviaButton" variant="dark">
          To the lobby (for development purposes)
        </Button>
      </Link>
    </div>
  );
};

export default HostChooseTrivia;
