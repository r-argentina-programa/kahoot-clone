import React from 'react';
import Image from 'react-bootstrap/Image';
import podiumImg from '../assets/podium.jpg';
import '../styles/Podium.css';
const Podium = (props) => {
  return (
    <div>
      {Object.entries(props.ranking).map(([keyValue, value]) => {
        return (
          <h1>
            {[value.name]} has {[value.score]} points
          </h1>
        );
      })}

      {/* <h2>
        {props.ranking[1].name} has {props.ranking[1].score} points and is in 2nd place
      </h2>
      <h3>
        {props.ranking[2].name} has {props.ranking[2].score} points and is in 3rd place
      </h3> */}
      <Image className="podiumImg" src={podiumImg} fluid></Image>
    </div>
  );
};

export default Podium;
