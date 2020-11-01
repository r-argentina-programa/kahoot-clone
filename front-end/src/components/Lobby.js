import StartGame from "./StartGame";
import Players from "./Players";
import StopGame from "./StopGame";
import React from "react";

const Lobby = (props) => {
  // const socket = props.socket;
  // const [triviaData, setTriviaData] = useState('');
  // socket.on('question', (triviaData) => {
  //   const newTriviaData = triviaData;
  //   console.log(triviaData);
  //   setTriviaData(newTriviaData);
  // });
  return (
    <div>
      <StartGame firstRound={props.triviaData} socket={props.socket} />
      <br />
      <Players players={props.players} />
      <br />
      <br />
      <br />
      <br />
      <StopGame />
    </div>
  );
};

export default Lobby;
