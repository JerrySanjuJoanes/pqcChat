import { MessageSquare, Users, Sparkles, ArrowLeft } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-br from-base-100/50 to-base-200/30">
      <div className="max-w-lg text-center space-y-8 animate-fadeInUp">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/30 flex items-center
             justify-center animate-bounce-slow shadow-lg"
            >
              <MessageSquare className="w-10 h-10 text-primary animate-pulse-slow" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-6 h-6 text-secondary animate-bounce" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-4">
          <h2 className="text-4xl font-bold gradient-text">Welcome to PQCchat!</h2>
          <p className="text-lg text-base-content/70 leading-relaxed">
            Select a conversation from the sidebar to start chatting with your friends
          </p>
        </div>

        {/* Features List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-base-200/50 hover:bg-base-200 transition-colors duration-200 animate-fadeInLeft" style={{animationDelay: '0.1s'}}>
            <div className="p-2 rounded-lg bg-success/10">
              <Users className="w-5 h-5 text-success" />
            </div>
            <span className="text-sm font-medium">Real-time messaging</span>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-base-200/50 hover:bg-base-200 transition-colors duration-200 animate-fadeInRight" style={{animationDelay: '0.2s'}}>
            <div className="p-2 rounded-lg bg-primary/10">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-medium">Image sharing</span>
          </div>
        </div>

        {/* Hint */}
        <div className="flex items-center justify-center gap-2 text-base-content/50 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Click on a contact to start chatting</span>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
