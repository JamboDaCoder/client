"use client";
import { ImExit } from "react-icons/im";
import { IoSend } from "react-icons/io5";
import { ImAttachment } from "react-icons/im";
import ChatBubble from "../ui/ChatBubble";
import { useEffect, useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage" 
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const storage = getStorage(firebaseApp)

const Chat = ({
  groupName,
  roomID,
  socket,
  chats,
  user,
}) => {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  const uploadImage = async (file) => {
    try {
      // Create a unique file name
      const fileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, `chat-images/${roomID}/${fileName}`);
      const snapshot = await uploadBytes(storageRef, file);
      console.log('Image uploaded successfully');
      
      // Get the download URL
      const url = await getDownloadURL(snapshot.ref);
      console.log('Image URL:', url);
      return url;
    } catch(error) {
      console.log(error)
      throw error
    }
  }

  const sendMessage = (event, type = "text") => {
    if (type === "text") {
      if (socket && message.trim()) {
        socket.emit("sending_message", {
          message,
          id: Math.floor(Math.random() * 1000000),
          owner: user.name,
          roomID,
          type: "text",
        });
        console.log(`Message sent to room: ${roomID}`);
        setMessage("");
      }
    } else {
      const file = event.target.files[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      const maxSize = 1 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert("File size should not exceed 5MB");
        return;
      }

      // Create a loading message

      const reader = new FileReader();
      console.log("Got here");
      reader.onerror = () => {
        alert("Error reading file");
      };

      reader.onloadstart = () => {
        console.log("Started loading image...");
      };

      reader.onload = async (e) => {
        // Take the selected image and upload it to the storage databse
        // Then get the URL then give it to the message as a URL string
        try {
          if (socket && socket.connected) {
            console.log("Sending image...");
            const messageURL = await uploadImage(file)
            socket.emit("sending_message", {
              message: messageURL,
              id: Math.floor(Math.random() * 1000000),
              owner: user.name,
              roomID,
              type: "image",
            });
            console.log(`Image sent to room: ${roomID}`);
          } else {
            console.error("Socket not connected");
            alert("Connection lost. Please try again.");
          }
        } catch (error) {
          console.error("Error sending image:", error);
          alert("Failed to send image. Please try again.");
        }
      };

      try {
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error reading file:", error);
        alert("Error reading file. Please try again.");
      }
    }
  };

  const mountCount = useRef(0);
  const isStrictModeRemount = useRef(false);

  useEffect(() => {
    mountCount.current += 1;
    isStrictModeRemount.current = mountCount.current === 1;

    console.log(
      "Chat component mounted for room:",
      roomID,
      "Mount count:",
      mountCount.current
    );

    if (!socket || !roomID) return;

    return () => {
      if (
        socket &&
        socket.connected &&
        roomID &&
        !isStrictModeRemount.current
      ) {
        console.log(
          "Chat component ACTUALLY unmounting, checking room closure for:",
          roomID
        );
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
          <b className="w-auto h-auto m-0 flex justify-center items-center relative scale-[2]">
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
            <ChatBubble
              key={chat.id}
              message={chat.message}
              type={chat.type || "text"}
              owner={chat.owner}
              user={user}
            />
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
              onClick={() => sendMessage(null, "text")}
              className="cursor-pointer text-black hover:text-green-500 transition-colors duration-200"
            />
          </div>
          <div className="flex-[1] flex-middle">
            <ImAttachment
              size={50}
              className="cursor-pointer hover:bg-red-400 transition-colors duration-200"
              onClick={() => fileInputRef.current?.click()}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => sendMessage(e, "image")}
              className="hidden"
            />
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
