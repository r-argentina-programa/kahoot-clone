import React from 'react';
import Alert from 'react-bootstrap/Alert';
import StopGame from './StopGame';
import Questions from './Questions';
import Countdown from './Countdown';
const Trivia = () => {
  return (
    <div>
      <Countdown />
      <br />
      <Questions />
      <Alert variant="warning">First option</Alert>
      <Alert variant="warning">Second option</Alert>
      <Alert variant="warning">Third option</Alert>
      <Alert variant="warning">Fourth option</Alert>
      <br />
      <StopGame />
    </div>
  );
};

export default Trivia;
