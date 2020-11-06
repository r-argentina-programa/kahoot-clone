import React, { useState, useEffect, createContext } from "react";
import socketIO from "socket.io-client";

export const ConnectionContext = createContext();

export const ConnectionProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const setConnection = async () => {
      const response = await fetch(`/connect`);
      const { pin } = await response.json();
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
  }, [socket]);

  return (
    <React.Fragment>
      {socket ? (
        <ConnectionContext.Provider value={socket}>
          {children}
        </ConnectionContext.Provider>
      ) : (
        "Loading..."
      )}
    </React.Fragment>
  );
};
