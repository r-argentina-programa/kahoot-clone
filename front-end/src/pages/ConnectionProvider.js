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
    console.log("hey");

    const setConnection = async () => {
      const response = await fetch(`/connect`);
      const { pin } = await response.json();
      const newSocket = socketIO(`/${pin}`);
      setSocket(newSocket);
    };

    setConnection();

    return () => {
      console.log(socket);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ConnectionContext.Provider value={socket}>
      {children}
    </ConnectionContext.Provider>
  );
};
