import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import '../styles/HostChooseTrivia.css';
const HostChooseTrivia = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [pin, setPin] = useState('');

  useEffect(() => {
    fetch('/trivialist')
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setIsLoaded(true);
        console.log('loading set');
        setItems(result.triviaList);
        setPin(result.pin);
        console.log('result set');
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);
  console.log(items, pin, isLoaded, error);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    const object = items.map((item, i) => (
      <Button key={i + 1} className="triviaButton" variant="dark">
        {item}
      </Button>
    ));
    return (
      <div>
        <div>
          <div className="containerTriviaButton">{object}</div>
          <br />
          <br />
          <Alert variant="dark">The PIN is {pin}</Alert>
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
