interface MessagesProps {
  onSelectRoom: (id: string | undefined) => void;
}

export default function Messages({ onSelectRoom }: MessagesProps) {
  return (
    <main className=" h-full overflow-y-auto p-4">
      <ul>
        <Message onSelectRoom={onSelectRoom} />
      </ul>
    </main>
  );
}

function Message({ onSelectRoom }: MessagesProps) {
  return (
    <li
      className={`flex flex-col rounded mb-4  min-w-9  max-w-40 px-4 py-2 bg-gray-500 dark:bg-gray-700 text-white`}
    >
      <div className="text-sm font-semibold ">{true ? "You" : "Username"}</div>
      <p className="text-sm my-1">HOLAAA</p>
      <div className="text-xs opacity-75 text-gray-200   ">
        {new Date().toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </li>
  );
}
