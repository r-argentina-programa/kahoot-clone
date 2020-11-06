import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ConnectionContext } from "./ConnectionProvider";

const Lobby = () => {
  const socket = useContext(ConnectionContext);
  const pin = socket.json.nsp.split("/")[1];

  return (
    <React.Fragment>
      <div>Pin: {pin}</div>
      <Link to="#">
        <button>Start</button>
      </Link>
    </React.Fragment>
  );
};
export default Lobby;
