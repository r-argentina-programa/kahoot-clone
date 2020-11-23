import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Home = () => {
  return (
    <React.Fragment>
      <body className="bg-primary">
        <header className="masthead bg-primary text-white text-center">
          <div className="container d-flex align-items-center flex-column">
            <h1 className="masthead-heading text-uppercase mb-0">Kahoot! Clone</h1>
            <div className="divider-custom divider-light">
              <div className="divider-custom-line"></div>
              <div className="divider-custom-icon">
                <i className="fas fa-star"></i>
              </div>
              <div className="divider-custom-line"></div>
            </div>
            <div className="masthead-subheading font-weight-light mb-0">
              <Link to="/host/chooseTrivia" className="btn">
                <Button className="join-host" variant="secondary">
                  I want to host a Trivia
                </Button>
              </Link>
              <Link to="/user" className="btn">
                <Button className="join-user" variant="secondary">
                  I want to join a Trivia
                </Button>
              </Link>
              <Link to="/admin/stats" className="btn">
                <Button className="join-user" variant="info">
                  Statistics
                </Button>
              </Link>
            </div>
          </div>
        </header>
      </body>
    </React.Fragment>
  );
};

export default Home;
