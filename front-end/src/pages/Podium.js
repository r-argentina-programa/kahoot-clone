import React from 'react';
import StopGame from '../components/StopGame';
import '../styles/Podium.css';
import Container from 'react-bootstrap/Container';
const Podium = (props) => {
  return (
    <React.Fragment>
      <body className="bg-primary">
        <Container>
          <div>
            {Object.entries(props.ranking).map(([keyValue, value]) => {
              return (
                <div>
                  <Container>
                    <h1 className="text-center text-dark" key={keyValue}>
                      {[value.name]} has {[value.score]} points
                    </h1>
                  </Container>
                  <div className="divider-custom divider-light">
                    <div className="divider-custom-line"></div>
                    <div className="divider-custom-icon">
                      <i className="fas fa-star"></i>
                    </div>
                    <div className="divider-custom-line"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>

        <Container>
          <StopGame
            socket={props.socket}
            socketUser={props.socketUser}
            setSocketUser={props.setSocketUser}
            setSocket={props.setSocket}
          />
        </Container>
      </body>
    </React.Fragment>
  );
};

export default Podium;
