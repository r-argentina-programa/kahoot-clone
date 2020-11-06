import React, { useState, useEffect, createContext } from "react";
import socketIO from "socket.io-client";

export const PlayerConnectionContext = createContext();

export const PlayerConnectionProvider = ({ children, pin }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const setConnection = async () => {
      const newSocket = socketIO(`/${pin}`);
      setSocket(newSocket);
    };

    if (!socket) {
      setConnection();
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket, pin]);

  return (
    <React.Fragment>
      {socket ? (
        <PlayerConnectionContext.Provider value={socket}>
          {children}
        </PlayerConnectionContext.Provider>
      ) : (
        "Loading..."
      )}
    </React.Fragment>
  );
};
