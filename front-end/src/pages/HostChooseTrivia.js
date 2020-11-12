import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import '../styles/HostChooseTrivia.css';
const HostChooseTrivia = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [pin, setPin] = useState('');

  useEffect(() => {
    fetch('/trivialist')
      .then((res) => res.json())
      .then((result) => {
        setIsLoaded(true);

        setItems(result.triviaList);
        setPin(result.pin);
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
    const object = items.map((item, i) => (
      <div className="container-trivia-btn">
        <Link
          key={`item-${i}`}
          to={{
            pathname: '/host/lobby',
            state: pin,
          }}
        >
          <Button
            key={i}
            onClick={() => props.onClickTriviaButton(item)}
            className={`triviaButton${i}`}
            variant="dark"
          >
            {item}
          </Button>
        </Link>
      </div>
    ));
    return (
      <div>
        <div>
          <div className="containerTriviaButton">{object}</div>
          <br />
          <br />
          <Alert className="display-pin" variant="dark">
            The PIN is {pin}
          </Alert>
          <br />
          <br />
          <br />
          <br />
          <Link to="/host/lobby">
            <Button className="triviaButton" variant="dark">
              To the lobby (for development purposes)
            </Button>
          </Link>
        </div>
      </div>
    );
  }
};

export default HostChooseTrivia;
