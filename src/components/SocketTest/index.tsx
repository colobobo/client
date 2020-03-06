import React, { FC, useCallback, useEffect, useState } from "react";
import io from "socket.io-client";

interface SocketTestProps {}

const SocketTest: FC<SocketTestProps> = () => {
  // state

  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);

  // function

  const connectToSocket = useCallback(() => {
    const url = process.env.REACT_APP_SERVER_URL as string;
    setSocket(io(url));
  }, []);

  // effects

  useEffect(() => {
    connectToSocket();
  }, [connectToSocket]);

  useEffect(() => {
    socket?.on("connect", () => {
      setIsConnected(true);
    });
    socket?.on("room:create:success", (e: any) => {
      setRoomId(e);
    });
  }, [socket]);

  useEffect(() => {
    if (isConnected) {
      socket?.emit("room:create");
    }
  }, [socket, isConnected]);

  return (
    <div>
      <p>Room id : {roomId}</p>
      <p style={{ color: isConnected ? "green" : "red" }}>
        {isConnected ? "Connecté" : "Pas connecté"}
      </p>
    </div>
  );
};

export default SocketTest;
