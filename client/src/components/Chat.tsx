import Header from "./Header";
import Messages from "./Messages";
import SendInput from "./SendInput";

interface ChatProps {
  onSelectRoom: (id: string | undefined) => void;
}

export default function Chat({ onSelectRoom }: ChatProps) {
  return (
    <div
      className="flex-1 flex flex-col"
      onKeyDownCapture={(e) => console.log(e)}
    >
      <Header />
      <Messages onSelectRoom={onSelectRoom} />
      <SendInput />
    </div>
  );
}
