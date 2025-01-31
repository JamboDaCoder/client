"use client";
import Chat from "@/components/pages/Chat";
import LandingPage from "@/components/pages/LandingPage";
import { useRef } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3002");

const Home = () => {

  const user = useRef(null)

  return (
    // <LandingPage socket={socket} user={user}/>
    <Chat />
  );
};

export default Home;
