import React from "react";

import Button from "react-bootstrap/Button";
import "../styles/Home.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="container h-center">
      <Link to="/host">
        <Button className="join-host" variant="primary">
          I want to host a Trivia
        </Button>
      </Link>
      <Link to="/user">
        <Button className="join-user" variant="primary">
          I want to join a Trivia
        </Button>
      </Link>
      <Link to="/admin/stats">
        <Button className="join-user" variant="primary">
          Statistics
        </Button>
      </Link>
    </div>
  );
};

export default Home;
