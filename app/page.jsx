"use client";
import Image from "next/image";
import { useState } from "react";
import Status from "./components/status";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:3001");

const Home = () => {
  const [isCreate, setIsCreate] = useState(true);
  const [username, setUsername] = useState("");
  const [roomID, setRoomID] = useState("");
  const [groupName, setGroupName] = useState("");

  return (
    <div className="bg-gradient-to-b from-[#1A659E] to-[#103959] w-screen h-screen flex flex-col">
      <div className="flex flex-row items-center justify-center gap-5 mt-5">
        <Image
          src={"/logo-J.png"}
          width={100}
          height={100}
          alt="JamChat Logo"
          className="drop-shadow-lg"
        />
        <div className="text-8xl">
          <span className="text-[#EFEFD0] drop-shadow-lg">Jam</span>
          <span className="text-[#FF6B35] drop-shadow-lg">Chat</span>
        </div>
      </div>
      <div>
        <Status otherStyles="" />
        <div>
          <label htmlFor="username">Username :</label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="RoomID">Room ID :</label>
          <br />
          <input
            type="text"
            id="RoomID"
            name="RoomID"
            value={roomID}
            onChange={(e) => {
              setRoomID(e.target.value);
              console.log(roomID);
            }}
          />
        </div>
        <div>
          <label htmlFor="group-name">Group Name :</label>
          <br />
          <input
            type="text"
            id="group-name"
            name="group-name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
      </div>
      <footer>
        <h2>This is a demo version of a larger applications</h2>
      </footer>
    </div>
  );
};

export default Home;
