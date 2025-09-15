import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-8 animate-fadeInUp">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold gradient-text">Settings</h2>
          <p className="text-base text-base-content/70">
            Customize your chat experience
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            Theme Selection
          </h3>
          <p className="text-sm text-base-content/70">
            Choose a theme that matches your style
          </p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
          {THEMES.map((t, index) => (
            <button
              key={t}
              className={`
                group flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 hover:scale-105 animate-fadeInUp
                ${theme === t 
                  ? "bg-primary/10 ring-2 ring-primary/30 shadow-md" 
                  : "hover:bg-base-200/50 hover:shadow-sm"
                }
              `}
              style={{animationDelay: `${index * 0.02}s`}}
              onClick={() => setTheme(t)}
            >
              <div
                className="relative h-10 w-full rounded-lg overflow-hidden shadow-sm"
                data-theme={t}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
                {theme === t && (
                  <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                  </div>
                )}
              </div>
              <span className="text-xs font-medium truncate w-full text-center group-hover:text-primary transition-colors">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Preview Section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            Live Preview
          </h3>
          <p className="text-sm text-base-content/70">
            See how your theme looks in action
          </p>
        </div>
        
        <div className="rounded-2xl border border-base-300 overflow-hidden bg-base-100 shadow-xl animate-fadeInUp" style={{animationDelay: '0.2s'}}>
          <div className="p-6 bg-gradient-to-r from-base-200 to-base-300">
            <div className="max-w-lg mx-auto">
              {/* Mock Chat UI */}
              <div className="bg-base-100 rounded-2xl shadow-lg overflow-hidden border border-base-300">
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      J
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">John Doe</h3>
                      <p className="text-xs text-base-content/70">Online</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.isSent ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${
                            message.isSent
                              ? "bg-primary text-primary-content"
                              : "bg-base-200"
                          }
                        `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`
                            text-[10px] mt-1.5
                            ${
                              message.isSent
                                ? "text-primary-content/70"
                                : "text-base-content/70"
                            }
                          `}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1 text-sm h-10"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="btn btn-primary h-10 min-h-0">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
