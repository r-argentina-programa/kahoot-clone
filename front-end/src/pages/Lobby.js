import StartGame from '../components/StartGame';
import Players from '../components/Players';
import StopGame from '../components/StopGame';
import React from 'react';

const Lobby = (props) => {
  return (
    <div>
      <StartGame firstRound={props.triviaData} socket={props.socket} />
      <br />
      <Players players={props.players} />
      <br />
      <br />
      <br />
      <br />
      <StopGame socket={props.socket} />
    </div>
  );
};

export default Lobby;
