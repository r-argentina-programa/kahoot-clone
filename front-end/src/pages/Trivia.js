import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import StopGame from '../components/StopGame';
import Questions from '../components/Questions';
import Countdown from '../components/Countdown';
import '../styles/Trivia.css';

const Trivia = (props) => {
  const [isClicked0, setIsClicked0] = useState(false);
  const [isClicked1, setIsClicked1] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [isClicked3, setIsClicked3] = useState(false);
  const socket = props.socket;
  const onGameEnd = props.onGameEnd;
  socket.on('game ended', (podium) => {
    onGameEnd(podium);
  });
  useEffect(() => {
    setIsClicked0(false);
    setIsClicked1(false);
    setIsClicked2(false);
    setIsClicked3(false);

    return () => {};
  }, [props.triviaData]);
  return (
    <div>
      <Countdown />
      <br />
      <Questions triviaData={props.triviaData} />
      <Alert
        className="answer"
        onClick={() => {
          setIsClicked0(true);
          socket.emit('answer', 0);
        }}
        variant={isClicked0 ? 'success' : 'warning'}
      >
        {props.triviaData.options[0]}
      </Alert>
      <Alert
        className="answer"
        onClick={() => {
          setIsClicked1(true);
          socket.emit('answer', 0);
        }}
        variant={isClicked1 ? 'success' : 'warning'}
      >
        {props.triviaData.options[1]}
      </Alert>
      <Alert
        className="answer"
        onClick={() => {
          setIsClicked2(true);
          socket.emit('answer', 0);
        }}
        variant={isClicked2 ? 'success' : 'warning'}
      >
        {props.triviaData.options[2]}
      </Alert>
      <Alert
        className="answer"
        onClick={() => {
          setIsClicked3(true);
          socket.emit('answer', 0);
        }}
        variant={isClicked3 ? 'success' : 'warning'}
      >
        {props.triviaData.options[3]}
      </Alert>
      <br />
      <StopGame socket={socket} />
    </div>
  );
};

export default Trivia;
