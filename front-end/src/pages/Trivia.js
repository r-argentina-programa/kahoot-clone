import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import StopGame from '../components/StopGame';
import Questions from '../components/Questions';
import Countdown from '../components/Countdown';
import '../styles/Trivia.css';
import Button from 'react-bootstrap/esm/Button';

const Trivia = (props) => {
  const onGameEnd = props.onGameEnd;
  const { socketUser, socketHost } = props;

  useEffect(() => {
    if (socketUser) {
      socketUser.on('podium', (podium) => {
        onGameEnd(podium);
      });
    }
    return () => {};
  }, [onGameEnd, socketUser]);

  return props.triviaData ? (
    <div>
      <Countdown />
      <br />
      <Button className="next-question" onClick={() => socketHost.emit('next-question')}>
        Next Question
      </Button>
      <Questions triviaData={props.triviaData} />
      <div className="answers">
        {props.triviaData.options.map((option, index) => (
          <Alert
            key={`button-${index + 1}`}
            className={`answer answer${index}`}
            variant={'warning'}
          >
            {option.description}
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
  ) : (
    'Loading trivia...'
  );
};

export default Trivia;
