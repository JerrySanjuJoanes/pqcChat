import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, Sparkles } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-base-100/80 border-b border-base-300 fixed w-full top-0 z-40 
      backdrop-blur-md glass transition-all duration-300"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:scale-105 transition-all duration-200 group"
            >
              <div className="size-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center group-hover:shadow-lg transition-all duration-200">
                <MessageSquare className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform duration-200" />
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold gradient-text">PQCchat</h1>
                <Sparkles className="w-4 h-4 text-primary animate-pulse-slow" />
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className="btn btn-sm btn-ghost gap-2 transition-all duration-200 hover:bg-primary/10 hover:scale-105"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link 
                  to={"/profile"} 
                  className="btn btn-sm btn-ghost gap-2 transition-all duration-200 hover:bg-primary/10 hover:scale-105"
                >
                  <User className="size-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button 
                  className="btn btn-sm btn-ghost gap-2 transition-all duration-200 hover:bg-error/10 hover:scale-105 hover:text-error" 
                  onClick={logout}
                >
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
