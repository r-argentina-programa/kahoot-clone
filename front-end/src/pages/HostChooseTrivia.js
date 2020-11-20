import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import '../styles/HostChooseTrivia.css';
const HostChooseTrivia = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [triviaList, setTriviaList] = useState([]);
  const [pin, setPin] = useState('');

  useEffect(() => {
    fetch('/trivialist')
      .then((res) => res.json())
      .then((result) => {
        setTriviaList(result.triviaList);
        setPin(result.pin);
        setIsLoaded(true);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    const buttons = triviaList.map((trivia, i) => (
      <Link
        key={`item-${i + 1}`}
        to={{
          pathname: '/host/lobby',
          state: pin,
        }}
      >
        <Button
          key={i + 1}
          onClick={() => props.onClickTriviaButton(trivia.id)}
          className={`triviaButton triviaButton${i}`}
          variant="dark"
        >
          {trivia.name}
        </Button>
      </Link>
    ));
    return <div className="containerTriviaButton">{buttons}</div>;
  }
};

export default HostChooseTrivia;
