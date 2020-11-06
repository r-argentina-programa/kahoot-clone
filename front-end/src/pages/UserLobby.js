import React, { useEffect } from 'react';
import Alert from 'react-bootstrap/esm/Alert';
import Card from 'react-bootstrap/Card';
import socketIO from 'socket.io-client';
import { useLocation, useHistory } from 'react-router-dom';

const UserLobby = (props) => {
  const history = useHistory();
  const data = useLocation();
  const pin = data.state.pin;
  console.log(data.state.pin);
  const { setSocketUser } = props;
  const { socketUser } = props;

  useEffect(() => {
    if (!socketUser) {
      console.log('socket set');
      const newSocketUser = socketIO(`/${pin}`);
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
  }, [history, props, setSocketUser, pin, socketUser]);
  return (
    <div>
      <div className="container">
        <Alert variant="primary">The PIN of the room is {pin}</Alert>
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
