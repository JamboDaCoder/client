"use client";
import Chat from "@/components/pages/Chat";
import LandingPage from "@/components/pages/LandingPage";
import { useState } from "react";
import { useSocket } from "@/hooks/useSocket";

const Home = () => {
  const [user, setUser] = useState(null);
  const [roomID, setRoomID] = useState("");
  const [groupName, setGroupName] = useState("");
  const [chats, setChats] = useState([]);
  const [roomLoading, setRoomLoading] = useState(false)
  const socket = useSocket(setGroupName, setRoomID, setChats, setRoomLoading);
  

  return user ? (
    <Chat socket={socket} user={user} groupName={groupName} roomID={roomID} chats={chats}/>
  ) : (
    <LandingPage
      socket={socket}
      user={user}
      setUser={setUser}
      groupName={groupName}
      roomID={roomID}
      setRoomID={setRoomID}
      setGroupName={setGroupName}
      roomLoading={roomLoading}
      setRoomLoading={setRoomLoading}
    />
  );
};

export default Home;
