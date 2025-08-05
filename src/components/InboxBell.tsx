import { Bell } from "lucide-react";
import { useState } from "react";
import { useSocket } from "../contexts/SocketContext";

export default function InboxBell() {
  const [open, setOpen] = useState(false);
  const { inboxes } = useSocket();

  const unread = inboxes.length;

  const handleInboxClick = async (inboxId: string, link: string) => {
    try {
      await fetch(`http://localhost:8080/api/v1/inboxes/${inboxId}/read`, {
        method: "PATCH",
      });
    } catch (error) {
      console.error("Failed to mark inbox as read:", error);
    } finally {
      window.location.href = link;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative text-purple-200 hover:text-white transition"
      >
        <Bell className="w-6 h-6" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-fuchsia-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-2 z-50 text-sm">
          <h4 className="text-purple-700 font-semibold mb-2">Notifications</h4>
          {inboxes.length === 0 ? (
            <p className="text-gray-500">No notifications</p>
          ) : (
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {inboxes.map((inbox) => (
                <li
                  key={inbox.id}
                  className="hover:bg-purple-50 p-2 rounded cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleInboxClick(inbox.id, inbox.link);
                  }}
                >
                  <div className="text-gray-800">{inbox.message}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(inbox.createdAt).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
