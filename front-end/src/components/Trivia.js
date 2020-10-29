import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import StopGame from './StopGame';
import Questions from './Questions';
import Countdown from './Countdown';

const Trivia = (props) => {
  const socket = props.socket;

  return (
    <div>
      <Countdown />
      <br />
      <Questions triviaData={props.triviaData} />
      <Alert onClick={() => props.socket.emit('answer', 0)} variant="warning">
        {props.triviaData.options}
      </Alert>
      <Alert onClick={() => props.socket.emit('answer', 1)} variant="warning">
        {props.triviaData.options}
      </Alert>
      <Alert onClick={() => props.socket.emit('answer', 2)} variant="warning">
        {props.triviaData.options}
      </Alert>
      <Alert onClick={() => props.socket.emit('answer', 3)} variant="warning">
        {props.triviaData.options}
      </Alert>
      <br />
      <StopGame />
    </div>
  );
};

export default Trivia;
