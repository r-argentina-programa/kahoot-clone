import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

const Questions = (props) => {
  return (
    <div>
      <Jumbotron>
        {console.log(props.triviaData.question)}
        <h1>{props.triviaData.question}</h1>
      </Jumbotron>
    </div>
  );
};

export default Questions;
