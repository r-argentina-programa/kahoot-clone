import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

const Countdown = () => {
  const [counter, setCounter] = useState(60);

  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return <Alert variant="danger">You have {counter} seconds left</Alert>;
};

export default Countdown;
