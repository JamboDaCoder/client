const ChatBubble = ({ text, user, owner }) => {
  return (
    <div
      className={`flex flex-col w-[400px] m-5 rounded-md ${
        owner == user.name ? "bg-[#D2D8DD] self-end" : "bg-[#79AAEF] self-start"
      }`}
    >
      <div className="text-lg text-black px-5 py-3 break-words whitespace-pre-wrap">
        {text}
      </div>
      <div className="text-xs text-black w-full bg-opacity-20 bg-black flex flex-row">
        <div className=" px-5 py-1 flex-[1] text-left">
          {`From ${owner}`}
        </div>
        <div className="flex-[1] px-5 py-1 text-right">
          {new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date())}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
