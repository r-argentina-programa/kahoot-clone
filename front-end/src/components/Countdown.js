import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

const Countdown = (props) => {
  const [counter, setCounter] = useState(20);
  const { socket } = props;

  useEffect(() => {
    if (socket) {
      socket.on('timer', (counter) => {
        setCounter(counter);
      });
    }
  }, [socket]);

  return (
    <Alert className="counter bg-secondary border-dark">
      {counter ? `You have ${counter} seconds left` : 'You dont have any more time'}
    </Alert>
  );
};

export default Countdown;
