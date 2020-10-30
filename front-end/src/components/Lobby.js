import React from 'react';
import StartGame from './StartGame';
import Players from './Players';
import StopGame from './StopGame';
const Lobby = () => {
  return (
    <div>
      <StartGame />
      <br />
      <Players />
      <br />
      <br />
      <br />
      <br />
      <StopGame />
    </div>
  );
};

export default Lobby;
