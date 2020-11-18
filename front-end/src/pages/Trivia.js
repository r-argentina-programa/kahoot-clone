import React from 'react';
import Alert from 'react-bootstrap/Alert';
import StopGame from '../components/StopGame';
import Questions from '../components/Questions';
import Countdown from '../components/Countdown';
import '../styles/Trivia.css';
import Button from 'react-bootstrap/Button';
import Minipodium from '../components/MiniPodium';

const Trivia = (props) => {
  const { socketHost } = props;

  return props.triviaData ? (
    <div>
      <Countdown socket={socketHost} />
      <br />
      <Button className="next-question" onClick={() => socketHost.emit('next-question')}>
        Next
      </Button>
      <div className="container">
        <div className="item1">
          <Questions className="item1" triviaData={props.triviaData} />
        </div>
        <div className="item1">
          <Minipodium socketHost={socketHost} />
        </div>
      </div>
      <div className="answers">
        {props.triviaData.options.map((option, index) => (
          <Alert
            key={`button-${index + 1}`}
            className={`answer${index} answer`}
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
