import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import StopGame from '../components/StopGame';
import Questions from '../components/Questions';
import Countdown from '../components/Countdown';
import '../styles/TriviaUser.css';

const Trivia = (props) => {
  const [isClicked, setIsClicked] = useState('');
  const [isDisabled, setIsDisabled] = useState('');

  const onGameEnd = props.onGameEnd;
  const { socketUser, socketHost } = props;

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

  return props.triviaData ? (
    <div>
      <Countdown socket={socketUser} />
      <br />
      <Questions triviaData={props.triviaData} />
      <div className="answers">
        {props.triviaData.options.map((option, index) => (
          <Alert
            key={`index-${index + 1}`}
            className={`answer ${isDisabled} answer${index}`}
            onClick={() => {
              setIsClicked(option.description);
              setIsDisabled('clicked');
              socketUser.emit('answer', option.id);
              socketUser.emit('show-mini-podium');
            }}
            variant={isClicked === option.description ? 'success' : 'warning'}
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
