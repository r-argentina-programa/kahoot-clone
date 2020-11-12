import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import StopGame from '../components/StopGame';
import Questions from '../components/Questions';
import Countdown from '../components/Countdown';
import '../styles/Trivia.css';

const Trivia = (props) => {
  const [isClicked, setIsClicked] = useState('');
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
    setIsClicked(false);
    setIsDisabled('');
    return () => {};
  }, [onGameEnd, socketUser]);
  return (
    <div>
      <Countdown />
      <br />
      <Questions triviaData={props.triviaData} />
      <div className='answers'>
        {props.triviaData.options.map((answer, index) => (
          <Alert
            className={`answer ${isDisabled} answer${index}`}
            onClick={() => {
              setIsClicked(answer);
              setIsDisabled('clicked');
              socketUser.emit('answer', index++);
              console.log(socketUser);
            }}
            variant={isClicked === answer ? 'success' : 'warning'}
          >
            {answer}
          </Alert>
        ))}
      </div>
      {/* <Alert
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
      <Alert        className={`anwer ${isDisabled} answer3`}
        onClick={() =>{
          setIsClicked(true);
          setIsDisabled('clicked');
          socketUser.emit('answer', 3);
          console.log(socketUser);
        }}
        variant={isClicked3 ? 'success' : 'warning'}
      >
        {props.triviaData.options[3]}
      </Alert> */}
      <br />
      <StopGame socket={socketHost} />
    </div>
  );
};

export default Trivia;
