import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "luxury",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
    // Add smooth transition class to body for theme changes
    document.body.classList.add("theme-transition");
    setTimeout(() => {
      document.body.classList.remove("theme-transition");
    }, 300);
  },
}));
