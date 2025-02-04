"use client";
import { ImExit } from "react-icons/im";
import { IoSend } from "react-icons/io5";
import { ImAttachment } from "react-icons/im";
import ChatBubble from "../ui/ChatBubble";
import { useEffect, useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";

const Chat = ({ groupName = "[Group Name]", roomID = "1234", socket, chats, user }) => {
  const [message, setMessage] = useState("");
  const isMounted = useRef(false);

  const sendMessage = () => {
    if (socket && message.trim()) { 
      socket.emit("sending_message", { 
        message, 
        id: Math.floor(Math.random() * 1000000), 
        owner: user.name,
        roomID
      });
      console.log(`Message sent to room: ${roomID}`);
      setMessage("");
    }
  };

  const mountCount = useRef(0);
  const isStrictModeRemount = useRef(false);

  useEffect(() => {
    mountCount.current += 1;
    isStrictModeRemount.current = mountCount.current === 1;
    
    console.log("Chat component mounted for room:", roomID, "Mount count:", mountCount.current);

    if (!socket || !roomID) return;

    return () => {
      if (socket && socket.connected && roomID && !isStrictModeRemount.current) {
        console.log("Chat component ACTUALLY unmounting, checking room closure for:", roomID);
        socket.emit("checkRoomClose", roomID);
      } else {
        console.log("Skipping cleanup - Strict mode remount detected");
      }
    };
  }, [socket, roomID]);

  return (
    <div className="bg-gradient-to-b from-[#1A659E] to-[#103959] min-h-screen flex flex-col">
      <div className="w-full h-20 bg-[rgba(239,239,208,0.8)] flex flex-row">
        <div className="flex-[3] flex items-center justify-center">
          <b className=" w-auto h-auto m-0 flex justify-center items-center relative scale-[2]">
            {groupName}
          </b>
        </div>
        <div className="flex-[3] flex items-center justify-center">
          <input
            type="text"
            className="scale-[2] rounded-sm"
            placeholder="  Type Room ID"
          />
        </div>
        <div className="flex-[1] flex items-center justify-center">
          <ImExit size={50} className="transform-x-2" />
        </div>
      </div>
      <div className="w-full flex-[8] flex flex-col relative before:absolute before:inset-0 before:bg-center before:bg-no-repeat before:bg-[url('/J-Background.png')]">
        <div className="absolute inset-0 overflow-y-auto flex flex-col">
          {chats.map((chat) => (
            <ChatBubble key={chat.id} text={chat.message} owner={chat.name} user={user} />
          ))}
        </div>
      </div>
      <div className="w-full h-24 bg-[rgba(239,239,208,0.8)] flex">
        <div className="flex-[6] flex-middle">
          <Textarea
            placeholder="  Type here..."
            className="w-[90%] bg-[#505050] text-white font placeholder:text-white"
            onChangeHandler={setMessage}
            message={message}
          />
        </div>
        <div className="flex-[4] flex-middle flex-row">
          <div className="flex-[1] flex-middle">
            <IoSend
              size={50}
              onClick={sendMessage}
              className="cursor-pointer text-black hover:text-green-500 transition-colors duration-200"
            />
          </div>
          <div className="flex-[1] flex-middle">
            <ImAttachment size={50} />
          </div>
          <div className="flex-[3] flex-middle">
            <h1 className="text-black scale-[2]">ROOM ID : {roomID}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
