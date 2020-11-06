import React, { useState, useEffect, createContext } from "react";
import socketIO from "socket.io-client";

export const ConnectionContext = createContext();

/* async function fetchData(query) {
  const response = await fetch(query);
  const data = await response.json();
  return data;
}

async function setConnection(setter) {
  const response = await fetch(`/connect`);
  const { pin } = await response.json();
  const socket = socketIO(`/${pin}`);
  setter(socket);
} */

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
