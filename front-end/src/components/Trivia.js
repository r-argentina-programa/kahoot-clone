import React from 'react';
import Alert from 'react-bootstrap/Alert';
import StopGame from './StopGame';
import Questions from './Questions';
import Countdown from './Countdown';
import '../styles/Trivia.css';

const Trivia = (props) => {
  return (
    <div>
      <Countdown />
      <br />
      <Questions triviaData={props.triviaData} />
      <Alert className="answer" onClick={() => props.socket.emit('answer', 0)} variant="warning">
        {props.triviaData.options[0]}
      </Alert>
      <Alert className="answer" onClick={() => props.socket.emit('answer', 1)} variant="warning">
        {props.triviaData.options[1]}
      </Alert>
      <Alert className="answer" onClick={() => props.socket.emit('answer', 2)} variant="warning">
        {props.triviaData.options[2]}
      </Alert>
      <Alert className="answer" onClick={() => props.socket.emit('answer', 3)} variant="warning">
        {props.triviaData.options[3]}
      </Alert>
      <br />
      <StopGame />
    </div>
  );
};

export default Trivia;
