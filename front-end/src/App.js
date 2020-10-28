import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Lobby from './components/Lobby';
import Players from './components/Players';
import Trivia from './components/Trivia';
import StopGame from './components/StopGame';
function App() {
  return (
    <div className="App">
      <Lobby />
      <Players />
      <br />
      <br />
      <br />
      <br />
      <Trivia />
      <StopGame />
    </div>
  );
}

export default App;
