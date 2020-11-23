import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

const Questions = (props) => {
  return (
    <div>
      <Jumbotron className="question bg-secondary text-white-50 text-center">
        <h1 className="text-center">{props.triviaData.question}</h1>
      </Jumbotron>
    </div>
  );
};

export default Questions;
