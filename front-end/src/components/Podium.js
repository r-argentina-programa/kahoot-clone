import React from 'react';
import Image from 'react-bootstrap/Image';
import podiumImg from '../assets/podium.jpg';
const Podium = (props) => {
  return (
    <div>
      <h1>
        {props.ranking[0].name} has {props.ranking[0].score} points and is the winner
      </h1>
      {/* <h2>
        {props.ranking[1].name} has {props.ranking[1].score} points and is in 2nd place
      </h2>
      <h3>
        {props.ranking[2].name} has {props.ranking[2].score} points and is in 3rd place
      </h3> */}
      <Image src={podiumImg} rounded="true"></Image>
    </div>
  );
};

export default Podium;
