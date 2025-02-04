"use client";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = (setGroupName, setRoomID, setChats, setRoomLoading) => {
  const [socket, setSocket] = useState(null);
  const socketInitialized = useRef(false);

  useEffect(() => {
    if (!socketInitialized.current) {
      console.log("Initializing socket connection...");
      const newSocket = io("http://localhost:4412", {
        transports: ['websocket'],
        autoConnect: true,
        reconnection: true
      });
      
      newSocket.on("connect", () => {
        console.log("Socket connected!", newSocket.id);
        setSocket(newSocket);
      });

      newSocket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      newSocket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
      });

      newSocket.on("initial_data", (data) => {
        if (data) {
          console.log(data)
          setChats(data.chats)
          setGroupName(data.groupName)
          setRoomID(data.roomID)
          setRoomLoading(false)
          console.log("Room data updated on client")
        } else {
          console.log("Messsage data dosen't exist")
        }
      })

      newSocket.on("chat_updated", (data) => {
        console.log("Chat update event called")
        setChats(data.chats)
      })

      socketInitialized.current = true;
    }

    // Cleanup function to disconnect socket when component unmounts
    return () => {
      if (socket) {
        console.log("Cleaning up socket connection");
        socket.disconnect();
        setSocket(null);
        socketInitialized.current = false;
      }
    };
  }, []);

  return socket;
};
