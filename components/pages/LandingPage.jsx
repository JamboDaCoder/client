"use client";
import Image from "next/image";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateRoom, JoinRoom } from "@/components/status";
import SplashButton from "@/components/ui/SplashButton";

const LandingPage = ({socket, user}) => {
  const [username, setUsername] = useState("");
  const [roomID, setRoomID] = useState("");
  const [groupName, setGroupName] = useState("");
  const [activeTab, setActiveTab] = useState("create");

  const clickHandler = () => {
    if (activeTab === "create") {
        user.current = {name : username, id : socket.id}
      socket.emit("create-user", {name : username, roomID, groupName})
      setUsername("")
    } else {
        socket.emit("create-user", {name : username, roomID})
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#1A659E] to-[#103959] min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-row items-center justify-center gap-5 pt-10 pb-5">
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
      <Tabs
        defaultValue="create"
        value={activeTab}
        onValueChange={setActiveTab}
        className="h-[60vh] w-full flex items-center justify-center"
      >
        <div className="w-full h-full flex flex-col items-center">
          <div className="w-full h-[20%] flex items-end justify-center">
            <TabsList className="flex items-end justify-center w-50 h-50 bg-[#EFEFD0] scale-150">
              <TabsTrigger value="create">Create</TabsTrigger>
              <TabsTrigger value="join">Join</TabsTrigger>
            </TabsList>
          </div>

          <div className="h-[80%] w-full flex items-start justify-center">
            <TabsContent
              value="create"
              className="mt-20 h-50 scale-125 flex items-center justify-center"
            >
              <CreateRoom
                username={username}
                roomID={roomID}
                groupName={groupName}
                setUsername={setUsername}
                setRoomID={setRoomID}
                setGroupName={setGroupName}
              />
            </TabsContent>
            <TabsContent
              value="join"
              className="mt-20 h-50 scale-125 flex items-center justify-center"
            >
              <JoinRoom
                username={username}
                roomID={roomID}
                setUsername={setUsername}
                setRoomID={setRoomID}
              />
            </TabsContent>
          </div>
        </div>
      </Tabs>
      <SplashButton otherStyles="w-[100px]" handleClick={clickHandler}>
        Done
      </SplashButton>
      <footer className="flex items-center justify-center py-8 bg-[#103959] text-3xl mt-auto">
        <h2 className="text-white">
          This is a demo version of a larger application
        </h2>
      </footer>
    </div>
  );
};

export default LandingPage;
