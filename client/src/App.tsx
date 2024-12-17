import { useEffect, useState } from "react";
import WaitingRoom from "./components/WaitingRoom";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import ChatRoom from "./components/ChatRoom";
import { LogIn, MessageSquare, PlusCircle } from "lucide-react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Chat from "./components/Chat";
import SendInput from "./components/SendInput";
import { createPortal } from "react-dom";

export const SignalrEvents = {
  ReceiveMessage: "ReceiveMessage",
} as const;

function App() {
  const [connection, setConnection] = useState<HubConnection>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined | boolean>(
    false
  );
  const [createRoomModal, setCreateRoomModal] = useState(false);

  const joinChatRoom = async (username: string, chatroom: string) => {
    console.log(username, chatroom);
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7006/chat")
        .configureLogging(LogLevel.Trace)
        .build();

      console.log({ connection: connection });

      connection.on("JoinSpecificChat", (username, msg) => {
        console.log("msg: ", msg);
      });

      connection.on("ReceiveSpecificMessage", (username, message) => {
        setMessages((messages) => [...messages, { username, message }]);
      });

      await connection.start();

      // Asegurarse de pasar el objeto con las propiedades correctas
      await connection.invoke("JoinSpecificChat", {
        username,
        chatroom,
      });

      setConnection(connection);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (msg: string) => {
    try {
      await connection?.invoke("SendMessage", msg);
    } catch (error) {
      console.log(error);
    }
  };

  const test = () => {
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7006/chat")
      .configureLogging(LogLevel.Information)
      .build();

    connection
      .start()
      .then(() => {
        console.log("Conexión establecida.");

        // Enviar un mensaje al servidor
        connection
          .invoke(
            "EnviarMensaje",
            "Hello, this is a message from JavaScript client"
          )
          .then(() => {
            console.log("Mensaje enviado");
          })
          .catch((err) => {
            console.error("Error al enviar el mensaje:", err);
          });
      })
      .catch((err) => console.error("Error al conectar:", err));

    // Escuchar mensajes recibidos del servidor
    connection.on("ReceiveMessage", (message) => {
      console.log("Mensaje recibido:", message);
    });
  };

  const handleSelectRoom = (id: string | undefined) => {
    setSelectedRoom(true);
  };

  const handleCreateRoom = ({ name }: { name: string }) => {};

  useEffect(() => {
    const unselectRoom = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !selectedRoom) setSelectedRoom(undefined);
    };
    window.addEventListener("keydown", unselectRoom);
    return () => {
      window.removeEventListener("keydown", unselectRoom);
    };
  }, []);

  return (
    // <>
    //   <header>
    //     <h1 onClick={test}>Chat APP</h1>
    //     <p>{JSON.stringify(connection)}</p>
    //   </header>
    //   {connection ? (
    //     <ChatRoom messages={messages} sendMessage={sendMessage} />
    //   ) : (
    //     <WaitingRoom joinChatRoom={joinChatRoom} />
    //   )}
    // </>

    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 ">
      <Navbar onSelectRoom={handleSelectRoom} selectedRoom={selectedRoom} />
      {selectedRoom ? (
        <Chat onSelectRoom={handleSelectRoom} />
      ) : (
        <div className="select-none overflow-hidden flex flex-col items-center  w-full h-full text-center bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
          <svg
            className="my-12 opacity-60 "
            enableBackground="new 0 0 64 64"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            width={180}
          >
            <circle cx="32" cy="32" fill="#77b3d4" r="32" />
            <path
              d="m52 32c0-9.9-9-18-20-18s-20 8.1-20 18c0 9.6 8.3 17.4 18.8 17.9.7 3.7 1.2 6.1 1.2 6.1s5-3 9.6-8.2c6.2-3.1 10.4-9 10.4-15.8z"
              fill="#231f20"
              opacity=".2"
            />
            <path
              d="m49 28.8c0 15-17 25.2-17 25.2s-9.4-42 0-42 17 7.5 17 16.8z"
              fill="#fff"
            />
            <ellipse cx="32" cy="30" fill="#fff" rx="20" ry="18" />
            <g fill="#4f5d73">
              <circle cx="32" cy="30" r="2" />
              <circle cx="40" cy="30" r="2" />
              <circle cx="24" cy="30" r="2" />
            </g>
          </svg>
          <h2 className="text-xl font-semibold">
            Selecciona una sala para empezar a chatear
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Aquí aparecerán los mensajes cuando elijas una sala de chat.
          </p>

          {/* Botones de acciones */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => setCreateRoomModal(true)}
              className="flex items-center gap-2 px-4 py-2  border  rounded shadow hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              <PlusCircle size={20} /> Crear una sala
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border  rounded shadow hover:bg-gray-200 dark:hover:bg-gray-800">
              <LogIn size={20} /> Unirse a una sala
            </button>
          </div>
        </div>
      )}
      {createRoomModal &&
        createPortal(
          <CreateRoomModal
            onClose={() => setCreateRoomModal(false)}
            onCreateRoom={handleCreateRoom}
          />,
          document.body
        )}
    </div>
  );
}

export default App;

const CreateRoomModal = ({ onClose, onCreateRoom }) => {
  const [name, setName] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:text-white">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Crear una nueva sala</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nombre de la sala
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Nombre"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => onCreateRoom({ name })}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            Crear
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
