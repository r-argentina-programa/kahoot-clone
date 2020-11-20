import React from 'react';
import StopGame from '../components/StopGame';
import Questions from '../components/Questions';
import Countdown from '../components/Countdown';
import '../styles/Trivia.css';
import Button from 'react-bootstrap/Button';
import Minipodium from '../components/MiniPodium';
import Container from 'react-bootstrap/Container';
const Trivia = (props) => {
  const { socketHost } = props;

  return props.triviaData ? (
    <div>
      <Container>
        <Countdown socket={socketHost} />
      </Container>
      <br />

      <Container className="bg-light question-and-minipodium d-flex flex-nowrap justify-content-around">
        <div className="item1">
          <Questions className="item1" triviaData={props.triviaData} />
        </div>
        <div className="item1">
          <Minipodium socketHost={socketHost} />
        </div>
      </Container>
      <br />
      <h3>Answers</h3>
      <Container className="answers d-flex flex-wrap">
        {props.triviaData.options.map((option, index) => (
          <h3 key={`button-${index}`} className={`answer${index} answer`}>
            {option.description}
          </h3>
        ))}
      </Container>
      <br />
      <br />
      <Container className="d-flex justify-content-center">
        <Button className="next-question" onClick={() => socketHost.emit('next-question')}>
          Next
        </Button>
        <StopGame
          className="m-6"
          socket={socketHost}
          setSocketUser={props.setSocketUser}
          setSocket={props.setSocket}
        />
      </Container>
    </div>
  ) : (
    'Loading trivia...'
  );
};

export default Trivia;
