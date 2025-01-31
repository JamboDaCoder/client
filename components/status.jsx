export const CreateRoom = ({ username, roomID, groupName, setUsername, setRoomID, setGroupName }) => {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm text-white font-medium">Username :</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="RoomID" className="block text-sm text-white font-medium">Room ID :</label>
          <input
            type="text"
            id="RoomID"
            name="RoomID"
            value={roomID}
            onChange={(e) => {
              setRoomID(e.target.value);
            }}
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="group-name" className="block text-sm text-white font-medium">Group Name :</label>
          <input
            type="text"
            id="group-name"
            name="group-name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2"
          />
        </div>
      </div>
    </div>
  );
};

export const JoinRoom = ({username, setUsername, roomID, setRoomID}) => {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm text-white font-medium">Username :</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="RoomID" className="block text-sm text-white font-medium">Room ID :</label>
          <input
            type="text"
            id="RoomID"
            name="RoomID"
            value={roomID}
            onChange={(e) => {
              setRoomID(e.target.value);
              console.log(roomID);
            }}
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2"
          />
        </div>
        {/* Add an empty div to maintain consistent height with CreateRoom */}
        <div className="h-[72px]"></div>
      </div>
    </div>
  );
};
