import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import '../styles/HostChooseTrivia.css';
const HostChooseTrivia = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/trivialist')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          console.log(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    const object = Object.values(items).map((item, i) => (
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
