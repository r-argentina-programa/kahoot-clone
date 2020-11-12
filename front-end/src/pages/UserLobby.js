import React, { useEffect } from 'react';
import Alert from 'react-bootstrap/esm/Alert';
import Card from 'react-bootstrap/Card';
import socketIO from 'socket.io-client';
import { useLocation, useHistory } from 'react-router-dom';

const UserLobby = (props) => {
  const history = useHistory();
  const data = useLocation();
  const [playerNameState, pinState] = data.state;

  const playerName = playerNameState.playerName;
  const pin = pinState.pin;
  console.log(pin);
  console.log(playerName);
  console.log(data.state);
  const { setSocketUser, socketUser, BASE_URL } = props;
  console.log(BASE_URL);

  useEffect(() => {
    if (!socketUser) {
      console.log('socket set');

      let newSocketUser;
      if (BASE_URL === 'http://localhost:5000') {
        newSocketUser = socketIO(`/${pin}`, { query: `playerName=${playerName}` });
        console.log('user, development');
        console.log(newSocketUser);
      } else {
        newSocketUser = socketIO(`${BASE_URL}/${pin}`, { query: `playerName=${playerName}` });
        console.log('user, production');
        console.log(newSocketUser);
      }

      setSocketUser(newSocketUser);
    }

    if (socketUser) {
      console.log('listening...');
      socketUser.on('question', (data) => {
        console.log(data);
        props.setTriviaDataUser(data);
        history.push('/user/trivia');
      });
    }
  }, [history, props, setSocketUser, pin, socketUser, BASE_URL, playerName]);
  return (
    <div>
      <div className="container">
        <Alert className="lobby-pin" variant="primary">
          The PIN of the room is {pin}
        </Alert>
        <Alert className="lobby-nick" variant="primary">
          Your nick is {playerName}
        </Alert>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Welcome to Kahoot!</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Waiting for the host to start</Card.Subtitle>
            <Card.Text>
              The game will start when the host decides to, meanwhile you can give the PIN to your
              friends so they can play with you!
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default UserLobby;
