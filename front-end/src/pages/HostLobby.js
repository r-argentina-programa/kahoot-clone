import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import { Link, useLocation } from "react-router-dom";
import "../styles/HostLobby.css";
import socketIO from "socket.io-client";
import Players from "../components/Players";
import Button from "react-bootstrap/esm/Button";

const HostLobby = (props) => {
  const [players, setPlayers] = useState([]);
  const data = useLocation();
  const pin = data.state;
  const { socket, setTriviaData, BASE_URL } = props;

  useEffect(() => {
    if (!props.socket) {
      fetch(`/trivia/${pin}/${props.trivia}`).then(() => {
        let newSocketHost;
        if (BASE_URL === "http://localhost:5000") {
          newSocketHost = socketIO(`/${pin}`);
        } else {
          newSocketHost = socketIO(`${BASE_URL}/${pin}`);
        }
        props.setSocket(newSocketHost);
      });
    }
  }, [pin, props, BASE_URL]);

  useEffect(() => {
    if (socket) {
      console.log("hey");
      socket.on("question", (triviaData) => {
        console.log("HEY");
        const newTriviaData = triviaData;
        console.log("triviaData hostlobby", triviaData);
        setTriviaData(newTriviaData);
      });
      socket.on("playerlist", (players) => {
        const newPlayers = players;
        setPlayers(newPlayers);
      });
    }
  }, [socket, setTriviaData]);

  return (
    <div>
      <div className="container">
        <Alert className="pin-host-lobby" variant="dark">
          The PIN is {pin}
        </Alert>
        <Link to="/host/trivia">
          <Button onClick={() => props.socket.emit("start-game")}>
            Start Game
          </Button>
        </Link>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div>
        <Players players={players} />
      </div>
    </div>
  );
};

export default HostLobby;

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

// const [socket, setSocket] = useState(null);
// const [triviaData, setTriviaData] = useState({ options: [] });
