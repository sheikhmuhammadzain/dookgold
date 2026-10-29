import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Apply theme before React mounts (prevents flash)
try {
  const saved = localStorage.getItem("dook-theme");
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const useDark = saved ? saved === 'dark' : prefersDark;
  if (useDark) document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
} catch {}

createRoot(document.getElementById("root")!).render(<App />);
