import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Wifi, WifiOff, Circle } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-300 bg-base-100/50 backdrop-blur-sm">
      <div className="border-b border-base-300 w-full p-5 bg-gradient-to-r from-base-100 to-base-200/50">
        <div className="flex items-center gap-2 animate-fadeInLeft">
          <div className="p-2 rounded-lg bg-primary/10">
            <Users className="size-5 text-primary" />
          </div>
          <span className="font-semibold hidden lg:block gradient-text">Contacts</span>
        </div>
        
        <div className="mt-3 hidden lg:flex items-center gap-2 animate-fadeInLeft" style={{animationDelay: '0.1s'}}>
          <label className="cursor-pointer flex items-center gap-2 hover:bg-base-300/50 p-2 rounded-lg transition-colors">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary"
            />
            <span className="text-sm font-medium">Show online only</span>
          </label>
          <div className="flex items-center gap-1 text-xs text-base-content/60">
            <Wifi className="size-3" />
            <span>({onlineUsers.length - 1} online)</span>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3 space-y-1">
        {filteredUsers.map((user, index) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 mx-2 flex items-center gap-3 rounded-xl
              hover:bg-base-300/70 hover:scale-[1.02] transition-all duration-200
              animate-fadeInLeft group
              ${
                selectedUser?._id === user._id
                  ? "bg-primary/10 ring-2 ring-primary/20 shadow-md"
                  : "hover:shadow-sm"
              }
            `}
            style={{animationDelay: `${index * 0.05}s`}}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full border-2 border-base-300 group-hover:border-primary/30 transition-colors"
              />
              {onlineUsers.includes(user._id) ? (
                <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-base-100 online-pulse">
                  <Wifi className="size-2 text-white absolute inset-0 m-auto" />
                </div>
              ) : (
                <div className="absolute bottom-0 right-0 size-3 bg-base-300 rounded-full ring-2 ring-base-100">
                  <WifiOff className="size-2 text-base-content/40 absolute inset-0 m-auto" />
                </div>
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate group-hover:text-primary transition-colors">
                {user.fullName}
              </div>
              <div className="text-sm flex items-center gap-1">
                {onlineUsers.includes(user._id) ? (
                  <>
                    <Circle className="size-2 fill-green-500 text-green-500" />
                    <span className="text-green-600 font-medium">Online</span>
                  </>
                ) : (
                  <>
                    <Circle className="size-2 fill-base-400 text-base-400" />
                    <span className="text-base-content/60">Offline</span>
                  </>
                )}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-base-content/60 py-8 animate-fadeInUp">
            <Users className="size-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No contacts available</p>
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
