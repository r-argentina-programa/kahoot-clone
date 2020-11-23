import React, { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import socketIO from 'socket.io-client';
import { useLocation, useHistory } from 'react-router-dom';

const UserLobby = (props) => {
  const history = useHistory();
  const data = useLocation();
  const [playerNameState, pinState] = data.state;

  const playerName = playerNameState.playerName;
  const pin = pinState.pin;
  const { setSocketUser, socketUser, BASE_URL } = props;

  useEffect(() => {
    if (!socketUser) {
      let newSocketUser;

      if (BASE_URL === 'http://localhost:5000') {
        newSocketUser = socketIO(`/${pin}`, {
          query: `playerName=${playerName}`,
        });
      } else {
        newSocketUser = socketIO(`${BASE_URL}/${pin}`, {
          query: `playerName=${playerName}`,
        });
      }

      setSocketUser(newSocketUser);
    }

    if (socketUser) {
      socketUser.on('question', (data) => {
        props.setTriviaDataUser(data);
        history.push('/user/trivia');
      });
    }
  }, [history, props, setSocketUser, pin, socketUser, BASE_URL, playerName]);
  return (
    <body className="bg-primary">
      <div>
        <div className="container h-center v-center">
          <Alert className="lobby-pin border-dark" variant="primary">
            The PIN of the room is {pin}
          </Alert>
          <Alert className="lobby-nick border-dark" variant="primary">
            Your nick is {playerName}
          </Alert>
        </div>
        <br />
        <div className="container">
          <Card className="bg-secondary" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className="text-white">Welcome to Kahoot!</Card.Title>
              <Card.Subtitle className="mb-2 text-info">
                Waiting for the host to start
              </Card.Subtitle>
              <Card.Text className="text-white">
                The game will start when the host decides to, meanwhile you can give the PIN to your
                friends so they can play with you!
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </body>
  );
};

export default UserLobby;
