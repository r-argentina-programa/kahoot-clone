import React, { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import StopGame from '../components/StopGame';
import Questions from '../components/Questions';
import Countdown from '../components/Countdown';
import '../styles/Trivia.css';
import Minipodium from '../components/MiniPodium';
import Container from 'react-bootstrap/Container';
const Trivia = (props) => {
  const { socketHost, onGameEnd } = props;

  useEffect(() => {
    if (socketHost) {
      socketHost.on('podium', (podium) => {
        onGameEnd(podium);
      });
    }
  }, [socketHost, onGameEnd]);

  return props.triviaData ? (
    <React.Fragment>
      <body className="bg-primary">
        <div>
          <Container>
            <Countdown socket={socketHost} />
          </Container>

          <Alert className="container bg-secondary shadow-lg question-and-minipodium d-flex flex-nowrap justify-align-content-stretch text-center align-items-center text-uppercase text-secondary">
            <Alert className="item1 bg-secondary shadow-lg">
              <Questions className="item1" triviaData={props.triviaData} />
            </Alert>
            <div className="item1 bg-secondary shadow-lg">
              <Minipodium socketHost={socketHost} />
            </div>
          </Alert>
          <div className="container">
            <h3>Answers</h3>
          </div>

          <div className="container bg-primary answers d-flex flex-fill flex-wrap align-items-center justify-content-around">
            {props.triviaData.options.map((option, index) => (
              <button
                id={`answer${index}`}
                key={`button-${index}`}
                className={`answer-trivia${index} border-dark text-white text-center answer-trivia d-flex flex-wrap w-50 p-3`}
              >
                {option.description}
              </button>
            ))}
          </div>

          <Container className="d-flex h-center">
            <button
              className="next-question btn btn-secondary border-light"
              onClick={() => socketHost.emit('next-question')}
            >
              Next
            </button>
            <StopGame
              className="m-6"
              socket={socketHost}
              setSocketUser={props.setSocketUser}
              setSocket={props.setSocket}
            />
          </Container>
        </div>
      </body>
    </React.Fragment>
  ) : (
    'Loading trivia...'
  );
};

export default Trivia;
