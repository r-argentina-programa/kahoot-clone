import React from 'react';
import StartGame from './StartGame';
import Players from './Players';
import StopGame from './StopGame';

import React from 'react';
//Este componente Lobby recibe la lista de jugadores y se la pasa al componente Players
const Lobby = (props) => {
  console.log('Lobby component:', props.players);
  // const socket = props.socket;
  // const [triviaData, setTriviaData] = useState('');
  // socket.on('question', (triviaData) => {
  //   const newTriviaData = triviaData;
  //   console.log(triviaData);
  //   setTriviaData(newTriviaData);
  // });
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
