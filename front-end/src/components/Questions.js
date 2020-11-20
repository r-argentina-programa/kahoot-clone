import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

const Questions = (props) => {
  return (
    <div>
      <Jumbotron className="question bg-gradient-warning">
        <h1>{props.triviaData.question}</h1>
      </Jumbotron>
    </div>
  );
};

export default Questions;
