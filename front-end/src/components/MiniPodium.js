import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';

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
      <Alert className="counter bg-secondary text-white-50 text-center">
        {miniPodium ? (
          miniPodium.map((obj, index) => (
            <p className="" key={`item${index}`}>
              Question {obj.option} was chosen by: {obj.count} players
            </p>
          ))
        ) : (
          <div>Waiting...</div>
        )}
      </Alert>
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
