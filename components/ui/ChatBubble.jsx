import React from "react";

const ChatBubble = ({
  text = "This is a test message used for debugging",
  own = true,
}) => {
  return (
    <div
      className={`flex-middle flex-col w-[300px] mx-5 rounded-md overflow-hidden ${
        own ? "bg-[#D2D8DD]" : "bg-[#79AAEF]"
      }`}
    >
      <p className="text-lg text-black bg-red-300 px-5 py-2 h-auto">This is even more text that i have to deal with to understand how much i can fit. I guess you dont have to worry about it</p>
      <p className="text-sm text-black text-right w-full px-5 bg-slate-500">
        {new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date())}
      </p>
    </div>
  );
};

export default ChatBubble;
