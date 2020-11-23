import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import triviaImg from '../assets/trivia.svg';

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
      <div className="col-md-6 col-lg-4 mb-5">
        <div className="portfolio-item mx-auto">
          <Link
            key={`item-${i + 1}`}
            to={{
              pathname: '/host/lobby',
              state: pin,
            }}
          >
            <img
              src={triviaImg}
              key={i + 1}
              onClick={() => props.onClickTriviaButton(trivia.id)}
              className={`img-fluid triviaButton triviaButton${i}`}
              alt=""
            />
          </Link>
          <h2>{trivia.name}</h2>
        </div>
      </div>
    ));
    return (
      <React.Fragment>
        <body className="bg-primary">
          <header className="bg-primary text-white text-center">
            <div className="container d-flex align-items-center flex-column">
              <section className="page-section portfolio" id="portfolio">
                <div className="">
                  <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
                    Choose your favorite Trivia!
                  </h2>
                  <div className="divider-custom">
                    <div className="divider-custom-line"></div>
                    <div className="divider-custom-icon">
                      <i className="fas fa-star"></i>
                    </div>
                    <div className="divider-custom-line"></div>
                  </div>
                  <div className="justify-content-center">
                    <div className="containerTriviaButton d-flex flex-wrap align-self-center">
                      {buttons}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </header>
        </body>
      </React.Fragment>
    );
  }
};

export default HostChooseTrivia;

/*
      <div className="col-md-6 col-lg-4 mb-5">
        <div className="portfolio-item mx-auto" data-toggle="modal" data-target="#portfolioModal1">
          <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
            <div className="portfolio-item-caption-content text-center text-white">
              <i className="fas fa-plus fa-3x"></i>
            </div>
            <Link
              key={`item-${i + 1}`}
              to={{
                pathname: '/host/lobby',
                state: pin,
              }}
            >
              <img
                key={i + 1}
                onClick={() => props.onClickTriviaButton(trivia.id)}
                className={`img-fluid triviaButton triviaButton${i}`}
                src={podiumImg}
                alt=""
              />
            </Link>
            <h4>ASDASDAS</h4>
          </div>
        </div>
      </div>
*/
