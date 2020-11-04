import React from 'react';
import Button from 'react-bootstrap/Button';
import '../styles/HostChooseTrivia.css';
const HostChooseTrivia = () => {
  return (
    <div className="containerTriviaButton">
      <Button className="triviaButton" variant="dark">
        Trivia 1
      </Button>
      <Button className="triviaButton" variant="dark">
        Trivia 2
      </Button>
    </div>
  );
};

export default HostChooseTrivia;
