import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import StopGame from './StopGame';
import Questions from './Questions';
import Countdown from './Countdown';

const Trivia = (props) => {
  const socket = props.socket;
  socket.emit('next question');
  const [triviaData, setTriviaData] = useState('');
  socket.on('question', (triviaData) => {
    const newTriviaData = triviaData;
    setTriviaData(newTriviaData);
  });
  return (
    <div>
      <Countdown />
      <br />
      <Questions triviaData={triviaData} />
      <Alert variant="warning">{triviaData.options[0]}</Alert>
      <Alert variant="warning">{triviaData.options[1]}</Alert>
      <Alert variant="warning">{triviaData.options[2]}</Alert>
      <Alert variant="warning">{triviaData.options[3]}</Alert>
      <br />
      <StopGame />
    </div>
  );
};

export default Trivia;
