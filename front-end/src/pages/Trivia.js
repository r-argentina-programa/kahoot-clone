import React, { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import StopGame from '../components/StopGame';
import Questions from '../components/Questions';
import Countdown from '../components/Countdown';
import '../styles/Trivia.css';
import Minipodium from '../components/MiniPodium';

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
      <body id="page-top" className="bg-primary">
        <div>
          <div className="text-center text-white bg-secondary text-uppercase">
            <Countdown socket={socketHost} />
          </div>

          <Alert className="container bg-primary question-and-minipodium d-flex flex-nowrap  text-center text-uppercase text-secondary">
            <Alert className="item1 bg-secondary shadow-lg">
              <Questions className="item1 shadow-lg" triviaData={props.triviaData} />
            </Alert>
            <Alert className="item1 bg-secondary shadow-lg">
              <Minipodium className="shadow-lg" socketHost={socketHost} />
            </Alert>
          </Alert>
          <div className="container">
            <h3>Answers</h3>
          </div>

          <div className="container bg-primary answers d-flex justify-content-between flex-wrap">
            {props.triviaData.options.map((option, index) => (
              <button
                id={`answer${index}`}
                key={`button-${index}`}
                className={`answer-trivia${index} text-white text-center answer-trivia d-flex flex-wrap w-50 border p-3`}
              >
                {option.description}
              </button>
            ))}
          </div>
          <div className="bg-primary">
            <br />
          </div>
          <div className="text-center text-white bg-primary text-uppercase">
            <button
              className="next-question btn btn-secondary border-light"
              onClick={() => socketHost.emit('next-question')}
            >
              Next
            </button>
            <StopGame
              className="m-3"
              socket={socketHost}
              setSocketUser={props.setSocketUser}
              setSocket={props.setSocket}
            />
          </div>
        </div>
      </body>
    </React.Fragment>
  ) : (
    'Loading trivia...'
  );
};

export default Trivia;
