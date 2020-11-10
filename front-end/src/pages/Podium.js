import React from "react";
import Image from "react-bootstrap/Image";
import podiumImg from "../assets/podium.jpg";
import StopGame from "../components/StopGame";
import "../styles/Podium.css";
const Podium = (props) => {
  return (
    <div>
      {Object.entries(props.ranking).map(([keyValue, value]) => {
        return (
          <h1 key={keyValue}>
            {[value.name]} has {[value.score]} points
          </h1>
        );
      })}
      <Image className="podiumImg" src={podiumImg} fluid></Image>
      <br />
      <StopGame
        socket={props.socket}
        setSocketUser={props.setSocketUser}
        setSocket={props.setSocket}
      />
    </div>
  );
};

export default Podium;
