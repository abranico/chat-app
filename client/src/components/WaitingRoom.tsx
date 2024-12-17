import { FormEvent, useState } from "react";

interface WaitingRoomProps {
  joinChatRoom: (username: string, chatroom: string) => void;
}

export default function WaitingRoom({ joinChatRoom }: WaitingRoomProps) {
  const [username, setUsername] = useState("");
  const [chatroom, setChatroom] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    joinChatRoom(username, chatroom);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <br />
      <input
        type="text"
        placeholder="Chatroom"
        onChange={(e) => setChatroom(e.target.value)}
        value={chatroom}
      />
      <br />
      <button type="submit">Join</button>
    </form>
  );
}
