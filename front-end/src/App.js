import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Lobby from './components/Lobby';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Trivia from './components/Trivia';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Lobby} />
          <Route path="/trivia" component={Trivia} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
