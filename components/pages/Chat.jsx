import { ImExit } from "react-icons/im";

const Chat = ({ groupName = "[Group Name]" }) => {
  return (
    <div className="bg-gradient-to-b from-[#1A659E] to-[#103959] min-h-screen flex flex-col">
      <div className="w-full h-20 bg-[#EFEFD0] flex flex-row">
        <div className='flex-[3] bg-blue-500 flex items-center justify-center'>
          <b className="bg-pink-500 w-auto h-auto m-0 flex justify-center items-center relative scale-[1]">{groupName}</b>
        </div>
        <div className='flex-[3] bg-yellow-500 flex items-center justify-center'>
          <input type="text" className="scale-[1] rounded-sm" placeholder='  Type Room ID' />
        </div>
        <div className='flex-[1] bg-orange-500 flex items-center justify-center'>
          <ImExit size={30}/>
        </div>
      </div>
      <div className="w-full flex-[8] bg-green-500"></div>
      <div className="w-full flex-[1] bg-red-500"></div>
    </div>
  );
};

export default Chat;
