import { X, Phone, Video, MoreVertical, Circle, Wifi, WifiOff } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-4 border-b border-base-300 bg-base-100/80 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-12 rounded-full relative border-2 border-base-300 hover:border-primary/30 transition-colors">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                className="object-cover"
              />
              {onlineUsers.includes(selectedUser._id) && (
                <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-base-100 online-pulse">
                  <Wifi className="size-2 text-white absolute inset-0 m-auto" />
                </div>
              )}
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-semibold text-lg">{selectedUser.fullName}</h3>
            <div className="flex items-center gap-1">
              {onlineUsers.includes(selectedUser._id) ? (
                <>
                  <Circle className="size-2 fill-green-500 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">Online</span>
                </>
              ) : (
                <>
                  <Circle className="size-2 fill-base-400 text-base-400" />
                  <span className="text-sm text-base-content/60">Offline</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost btn-circle hover:bg-primary/10 hover:text-primary transition-all duration-200">
            <Phone className="size-5" />
          </button>
          <button className="btn btn-ghost btn-circle hover:bg-primary/10 hover:text-primary transition-all duration-200">
            <Video className="size-5" />
          </button>
          <button className="btn btn-ghost btn-circle hover:bg-base-300 transition-all duration-200">
            <MoreVertical className="size-5" />
          </button>
          <button 
            onClick={() => setSelectedUser(null)}
            className="btn btn-ghost btn-circle hover:bg-error/10 hover:text-error transition-all duration-200 lg:hidden"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatHeader;
