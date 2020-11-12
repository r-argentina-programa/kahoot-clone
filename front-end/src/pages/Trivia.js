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
    setIsDisabled('clicked');
    return () => {};
  }, [onGameEnd, socketUser]);
  return (
    <div>
      <Countdown />
      <br />
      <Button className='next-question' onClick={() => socketHost.emit('next-question')}>Next Question</Button>
      <Questions triviaData={props.triviaData} />
      <div className="answers">
        {props.triviaData.options.map((answer, index) => (
          <Alert
            className={`answer ${isDisabled} answer${index}`}
            onClick={() => {
              setIsDisabled('clicked');
              socketUser.emit('answer', index++);
              console.log(socketUser);
            }}
            variant={'warning'}
          >
            {answer}
          </Alert>
        ))}
      </div>
      <br />
      <StopGame
        socket={socketHost}
        setSocketUser={props.setSocketUser}
        setSocket={props.setSocket}
      />
    </div>
  );
};

export default Trivia;
