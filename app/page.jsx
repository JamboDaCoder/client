"use client";
import Chat from "@/components/pages/Chat";
import LandingPage from "@/components/pages/LandingPage";
import { useRef } from "react";
import { useSocket } from "@/hooks/useSocket";

const Home = () => {
  const user = useRef(null);
  const socket = useSocket();

  return (
    // <LandingPage socket={socket} user={user}/>
    <Chat socket={socket} user={user}/>
  );
};

export default Home;
