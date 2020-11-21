import React from "react";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import logoSrc from "../assets/logo.png";

const Home = () => {
  return (
    <div>
      <header class="masthead bg-primary text-white text-center">
        <div class="container d-flex align-items-center flex-column">
          <img class="masthead-avatar mb-5" src="assets/logo.png" alt="" />
          <Image src={logoSrc} fluid></Image>
          <h1 class="masthead-heading text-uppercase mb-0">Kahoot! Clone</h1>
          <div class="divider-custom divider-light">
            <div class="divider-custom-line"></div>
            <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
            <div class="divider-custom-line"></div>
          </div>
          <div class="masthead-subheading font-weight-light mb-0">
            <Link to="/host" className="btn">
              <Button className="join-host" variant="secondary">I want to host a Trivia</Button>
            </Link>
            <Link to="/user" className="btn">
              <Button className="join-user" variant="secondary">I want to join a Trivia</Button>
            </Link>
            <Link to="/admin/stats" className="btn">
              <Button className="join-user" variant="info">Statistics</Button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;
