import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useLocation } from 'react-router-dom';
import '../styles/HostLobby.css';
//import Trivia from './Trivia';
import socketIO from 'socket.io-client';
import Players from '../components/Players';
const HostLobby = (props) => {
  const [socket, setSocket] = useState({});
  const [triviaData, setTriviaData] = useState({ options: [] });
  const data = useLocation();
  const pin = data.state;

  // useEffect(() => {
  //   fetch(`/trivia/${pin}/${props.trivia}`).then(() => {
  //     const socket = socketIO(`/${pin}`);
  //     setSocket(socket);
  //   });
  // });

  // useEffect(() => {
  //   console.log(socket);
  //   socket.on('question', (triviaData) => {
  //     const newTriviaData = triviaData;
  //     setTriviaData(newTriviaData);
  //   });
  // }, [socket, triviaData]);

  // const question = {
  //   question: 'Which is the biggest country?',
  //   options: ['Uruguay', 'BRAZIL', 'Paraguay', 'Peru'],
  // };
  // este es el mock del objeto que vendria del back que me pasaste
  useEffect(() => {
    const setConnection = async () => {
      await fetch(`/trivia/${pin}/${props.trivia}`);
      const newSocket = socketIO(`/${pin}`);
      setSocket(newSocket);
      socket.on('question', (triviaData) => {
        const newTriviaData = triviaData;
        setTriviaData(newTriviaData);
      });
    };
    if (!socket) {
      setConnection();
    }
  }, [pin, props.trivia, socket, triviaData]);
  console.log(triviaData);
  return (
    <div>
      <div className="container">
        <Alert variant="dark">The pin is {pin}</Alert>

        {/* <Trivia socket={socket} triviaData={question} />  esto lo dejo comentado para que puedas hacer lo de players*/}
      </div>
      <br />
      <br />
      <br />
      <br />
      <div>
        <Players players={['abc', 'asd', 123, 456]} />
        {/* <Alert variant="dark">Players</Alert>
        <Alert variant="dark">Players</Alert>
        <Alert variant="dark">Players</Alert>
        <Alert variant="dark">Players</Alert> */}
      </div>
    </div>
  );
};

export default HostLobby;
