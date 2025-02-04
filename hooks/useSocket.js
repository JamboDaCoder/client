"use client";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = (setGroupName, setRoomID, setChats, setRoomLoading) => {
  const [socket, setSocket] = useState(null);
  const socketInitialized = useRef(false);
  const socketInstance = useRef(null);

  useEffect(() => {
    if (!socketInitialized.current) {
      console.log("Initializing socket connection...");
      const newSocket = io("http://localhost:4412", {
        transports: ['websocket'],
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5
      });
      
      socketInstance.current = newSocket;

      newSocket.on("connect", () => {
        console.log("Socket connected!", newSocket.id);
        setSocket(newSocket);
      });

      newSocket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      newSocket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
        // Don't set socket to null on normal disconnects
        if (reason === "io server disconnect") {
          setSocket(null);
        }
      });

      newSocket.on("initial_data", (data) => {
        if (data) {
          console.log("Received initial data:", data);
          setChats(data.chats || []);
          setGroupName(data.groupName);
          setRoomID(data.roomID);
          setRoomLoading(false);
          console.log("Room data updated on client");
        } else {
          console.log("Message data doesn't exist");
        }
      });

      newSocket.on("chat_updated", (data) => {
        console.log("Chat update received:", data);
        if (data && data.chats) {
          setChats(data.chats);
        }
      });

      socketInitialized.current = true;
    }

    // Only clean up when component actually unmounts
    return () => {
      const currentSocket = socketInstance.current;
      if (currentSocket) {
        console.log("Component unmounting, cleaning up socket");
        currentSocket.disconnect();
        socketInstance.current = null;
        socketInitialized.current = false;
        setSocket(null);
      }
    };
  }, [setChats, setGroupName, setRoomID, setRoomLoading]); // Add proper dependencies

  return socket;
};
