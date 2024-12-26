import { useAuth } from "@/context/auth.context";
import { useTheme } from "@/context/theme.context";
import {
  MessageSquare,
  Moon,
  Nut,
  Plus,
  Settings,
  Sun,
  User,
} from "lucide-react";

interface NavbarProps {
  onSelectRoom: (id: string | undefined) => void;
  selectedRoom: boolean;
}

export default function Navbar({ onSelectRoom, selectedRoom }: NavbarProps) {
  const { handleTheme, theme } = useTheme();
  const { auth } = useAuth();

  return (
    <nav className="max-w-sm w-full flex flex-col bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <header className="flex justify-between items-center p-4  ">
        <h2 className="text-lg font-semibold">Rooms</h2>{" "}
        <span className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-2">
          <Plus size={20} />
        </span>
      </header>
      <ul className="py-4">
        <li
          onClick={onSelectRoom}
          className={`flex items-center gap-3 p-3 border-b last:border-0 border-gray-200 dark:border-gray-500  rounded-lg cursor-pointer transition-all ${
            selectedRoom
              ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          {/* Imagen o Icono */}
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-gray-700 rounded-full">
            <MessageSquare
              size={24}
              className="text-blue-500 dark:text-blue-300"
            />
          </div>

          {/* Contenido del Chat */}
          <div className="flex flex-col flex-grow">
            {/* Nombre de la Sala */}
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Sala
              </p>
              {/* Hora del Último Mensaje */}
              <span className="text-xs text-gray-500 dark:text-gray-400">
                10:45 AM
              </span>
            </div>
            {/* Último Mensaje */}
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              You: Hola
            </p>
          </div>
        </li>
      </ul>
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-auto flex justify-between items-center p-4 h-16">
        <div className="flex gap-2">
          <User />
          <p>{auth?.username}</p>
        </div>
        <div className="flex gap-2">
          <span
            className="cursor-pointer hover:text-gray-400"
            onClick={handleTheme}
          >
            {theme === "dark" ? <Moon /> : <Sun />}
          </span>
          {/* <span className="cursor-pointer hover:text-gray-500">
            <Settings />
          </span> */}
        </div>
      </footer>
    </nav>
  );
}
