"use client";
import { ImExit } from "react-icons/im";
import { IoSend } from "react-icons/io5";
import { ImAttachment } from "react-icons/im";
import ChatBubble from "../ui/ChatBubble";
import { useState } from "react";

const Chat = ({
  groupName = "[Group Name]",
  roomID = "1234",
  socket,
  user,
}) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    console.log("Ran send message function from client");
    console.log(message)
    socket.emit("sending_message", { theMessage: message });
    setMessage("");
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
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
      </div>
      <div className="w-full flex-[1] bg-[#EFEFD0] flex">
        <div className="flex-[6] flex-middle">
          <input
            type="text"
            placeholder="  Type here"
            className="scale-[2] rounded-sm w-[40%] h-[25%] bg-[#505050] opacity-50 text-white py-5 px-2.5"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="flex-[4] flex-middle flex-row  ">
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
