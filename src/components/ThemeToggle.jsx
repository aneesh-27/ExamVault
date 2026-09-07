import React, { useState, useRef, useEffect } from "react";
import { Sun, Moon, Laptop, Check } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function ThemeToggle({ variant = "dropdown", className = "" }) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const options = [
    { key: "light", label: "Light", icon: Sun },
    { key: "dark", label: "Dark", icon: Moon },
    { key: "system", label: "System", icon: Laptop },
  ];

  if (variant === "button") {
    return (
      <button
        onClick={toggleTheme}
        className={`sa-btn-outline p-2 relative flex items-center justify-center transition-transform hover:scale-105 active:scale-95 ${className}`}
        title={`Current: ${theme} mode. Click to toggle`}
        aria-label="Toggle theme"
      >
        {resolvedTheme === "dark" ? (
          <Sun size={17} className="text-amber-400 transition-transform rotate-0" />
        ) : (
          <Moon size={17} className="transition-transform rotate-0" style={{ color: "var(--text)" }} />
        )}
      </button>
    );
  }

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="sa-btn-outline p-2 relative flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        title={`Theme: ${theme}`}
        aria-label="Theme menu"
        aria-expanded={menuOpen}
      >
        {resolvedTheme === "dark" ? (
          <Moon size={16} className="text-amber-300" />
        ) : (
          <Sun size={16} className="text-amber-500" />
        )}
      </button>

      {menuOpen && (
        <div
          className="absolute right-0 mt-2 w-36 sa-card py-1.5 shadow-xl z-50 sa-fade-in"
          style={{
            background: "var(--surface)",
            borderColor: "var(--line)",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
            Theme
          </div>
          {options.map(({ key, label, icon: Icon }) => {
            const isSelected = theme === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setTheme(key);
                  setMenuOpen(false);
                }}
                className="w-full px-3 py-1.5 text-xs flex items-center justify-between transition-colors text-left font-medium"
                style={{
                  background: isSelected ? "var(--surface-subtle)" : "transparent",
                  color: isSelected ? "var(--accent)" : "var(--text)",
                }}
              >
                <div className="flex items-center gap-2">
                  <Icon size={14} style={{ color: isSelected ? "var(--accent)" : "var(--muted)" }} />
                  <span>{label}</span>
                </div>
                {isSelected && <Check size={13} className="text-amber-500" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ThemeToggle;
