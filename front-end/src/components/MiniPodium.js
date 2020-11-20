import React, { useEffect, useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

const MiniPodium = (props) => {
  const [miniPodium, setMiniPodium] = useState(null);
  const socketHost = props.socketHost;

  useEffect(() => {
    if (socketHost) {
      console.log('fetching minipodium...');
      socketHost.on('mini-podium', (data) => {
        setMiniPodium(data);
      });
    }
  }, [socketHost]);

  return (
    <div>
      <Jumbotron className="counter" variant="danger">
        {miniPodium ? (
          miniPodium.map((obj, index) => (
            <p key={`item${index}`}>
              Question {obj.option} was chosen by: {obj.count} players
            </p>
          ))
        ) : (
          <div>Waiting...</div>
        )}
      </Jumbotron>
    </div>
  );
};

export default MiniPodium;

/*
[
  { option: 8, count: 1 },
  { option: 9, count: 0 },
  { option: 10, count: 1 }
]
*/
