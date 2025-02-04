"use client";
import { ImExit } from "react-icons/im";
import { IoSend } from "react-icons/io5";
import { ImAttachment } from "react-icons/im";
import ChatBubble from "../ui/ChatBubble";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const Chat = ({ groupName = "[Group Name]", roomID = "1234", socket, chats, user }) => {
  const [message, setMessage] = useState("");

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

  return (
    <div className="bg-gradient-to-b from-[#1A659E] to-[#103959] min-h-screen flex flex-col">
      <div className="w-full h-20 bg-[#EFEFD0] flex flex-row">
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
        <div className="flex-[1]  flex items-center justify-center">
          <ImExit size={50} className="transform-x-2" />
        </div>
      </div>
      <div className="w-full flex-[8] bg-green-500">
        {chats.map((chat) => (
          <ChatBubble key={chat.id} text={chat.message} owner={chat.name} user={user} />
        ))}
      </div>
      <div className="w-full flex-[1] bg-[#EFEFD0] flex">
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
