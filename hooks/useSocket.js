"use client";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const useSocket = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Only create the socket connection if it doesn't exist
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:4412");
    }

    // Cleanup function to disconnect socket when component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  return socketRef.current;
};
