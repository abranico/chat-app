import { Send } from "lucide-react";

export default function SendInput() {
  return (
    <form className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex gap-5 p-3 h-16 ">
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
      />
      <button className="p-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <Send size={20} />
      </button>
    </form>
  );
}
