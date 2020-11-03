import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import '../styles/Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <Jumbotron>
        <h1>Welcome, dear user</h1>
        <p>
          This is the landing page, here you will be able to choose which trivia game you want to
          join.
        </p>
        <div className="containerButtons">
          <p>
            <Button className="buttonToTrivia" variant="primary">
              Trivia 1
            </Button>
          </p>
          <p>
            <Button className="buttonToTrivia" variant="primary">
              Trivia 2
            </Button>
          </p>
          <p>
            <Button className="buttonToTrivia" variant="primary">
              Trivia 3
            </Button>
          </p>
        </div>
        <Link to="/lobby">
          <Button variant="primary">To the lobby</Button>
        </Link>
      </Jumbotron>
    </div>
  );
};

export default Home;
