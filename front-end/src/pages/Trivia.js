import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import StopGame from '../components/StopGame';
import Questions from '../components/Questions';
import Countdown from '../components/Countdown';
import '../styles/Trivia.css';
import Button from 'react-bootstrap/esm/Button';

const Trivia = (props) => {
  const [isClicked0, setIsClicked0] = useState(false);
  const [isClicked1, setIsClicked1] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [isClicked3, setIsClicked3] = useState(false);
  const [isDisabled, setIsDisabled] = useState('');

  const onGameEnd = props.onGameEnd;
  const { socketUser, socketHost } = props;
  console.log('trivia', socketHost);

  useEffect(() => {
    if (socketUser) {
      socketUser.on('podium', (podium) => {
        onGameEnd(podium);
      });
    }
    setIsClicked0(false);
    setIsClicked1(false);
    setIsClicked2(false);
    setIsClicked3(false);
    setIsDisabled('');
    return () => {};
  }, [onGameEnd, socketUser]);
  return (
    <div>
      <Countdown />
      <br />
      <Button onClick={() => socketHost.emit('next-question')}>Next Question</Button>
      <Questions triviaData={props.triviaData} />
      <Alert
        className={`answer ${isDisabled} answer0`}
        onClick={() => {
          setIsClicked0(true);
          setIsDisabled('clicked');
          socketUser.emit('answer', 0);
          console.log(socketUser);
        }}
        variant={isClicked0 ? 'success' : 'warning'}
      >
        {props.triviaData.options[0]}
      </Alert>
      <Alert
        className={`answer ${isDisabled} answer1`}
        onClick={() => {
          setIsClicked1(true);
          setIsDisabled('clicked');
          socketUser.emit('answer', 1);
          console.log(socketUser);
        }}
        variant={isClicked1 ? 'success' : 'warning'}
      >
        {props.triviaData.options[1]}
      </Alert>
      <Alert
        className={`answer ${isDisabled} answer2`}
        onClick={() => {
          setIsClicked2(true);
          setIsDisabled('clicked');
          socketUser.emit('answer', 2);
          console.log(socketUser);
        }}
        variant={isClicked2 ? 'success' : 'warning'}
      >
        {props.triviaData.options[2]}
      </Alert>
      <Alert
        className={`answer ${isDisabled} answer3`}
        onClick={() => {
          setIsClicked3(true);
          setIsDisabled('clicked');
          socketUser.emit('answer', 3);
          console.log(socketUser);
        }}
        variant={isClicked3 ? 'success' : 'warning'}
      >
        {props.triviaData.options[3]}
      </Alert>
      <br />
      <StopGame socket={socketHost} />
    </div>
  );
};

export default Trivia;

// viste como se conectaron dos mas, hay un problema con los eventos, sep algun useEffect seguro
