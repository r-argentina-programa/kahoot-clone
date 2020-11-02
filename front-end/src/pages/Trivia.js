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
  const [isDisabled, setIsDisabled] = useState('');
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
    setIsDisabled('');
    return () => {};
  }, [props.triviaData]);
  return (
    <div>
      <Countdown />
      <br />
      <Questions triviaData={props.triviaData} />
      <Alert
        className={`answer ${isDisabled}`}
        onClick={() => {
          setIsClicked0(true);
          setIsDisabled('clicked');
          socket.emit('answer', 0);
        }}
        variant={isClicked0 ? 'success' : 'warning'}
      >
        {props.triviaData.options[0]}
      </Alert>
      <Alert
        className={`answer ${isDisabled}`}
        onClick={() => {
          setIsClicked1(true);
          setIsDisabled('clicked');
          socket.emit('answer', 1);
        }}
        variant={isClicked1 ? 'success' : 'warning'}
      >
        {props.triviaData.options[1]}
      </Alert>
      <Alert
        className={`answer ${isDisabled}`}
        onClick={() => {
          setIsClicked2(true);
          setIsDisabled('clicked');
          socket.emit('answer', 2);
        }}
        variant={isClicked2 ? 'success' : 'warning'}
      >
        {props.triviaData.options[2]}
      </Alert>
      <Alert
        className={`answer ${isDisabled}`}
        onClick={() => {
          setIsClicked3(true);
          setIsDisabled('clicked');
          socket.emit('answer', 3);
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
