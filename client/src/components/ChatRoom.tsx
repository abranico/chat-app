import { FormEvent, useState } from "react";
import { Message } from "../App";

interface ChatRoomProps {
  messages: Message[];
  sendMessage: (msg: string) => void;
}

export default function ChatRoom({ messages, sendMessage }: ChatRoomProps) {
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    await sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <main>
      <h2>Chat with {messages.map((msg) => msg.username)}</h2>
      {messages.map((msg, index) => (
        <p key={index}>
          {msg.username}: {msg.message}
        </p>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Send message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </main>
  );
}
