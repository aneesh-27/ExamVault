import React, { useState } from "react";
import { Sun, Moon, Laptop, Check } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

function SettingsPage({ showToast }) {
  const { user } = useAuth();
  const [tab, setTab] = useState("Profile");
  const tabs = ["Profile", "Appearance", "Notifications", "Study Preferences", "Account"];
  const [difficulty, setDifficulty] = useState("Medium");
  const [notifs, setNotifs] = useState({ reminders: true, weekly: true, streak: false });
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    const label = newTheme === "light" ? "Light theme" : newTheme === "dark" ? "Dark theme" : "System theme";
    showToast(`Switched to ${label}`);
  };

  const themeCards = [
    {
      id: "light",
      label: "Light",
      icon: Sun,
      description: "Warm paper background with clear ink typography, inspired by academic textbooks.",
      previewBg: "#F9F8F4",
      previewSurface: "#FFFFFF",
      previewLine: "#E7E4DA",
      previewText: "#1C2130",
    },
    {
      id: "dark",
      label: "Dark",
      icon: Moon,
      description: "Deep midnight slate with luminous amber highlights, optimized for focused late-night study.",
      previewBg: "#0B0F17",
      previewSurface: "#131926",
      previewLine: "#222C40",
      previewText: "#F1F5F9",
    },
    {
      id: "system",
      label: "System",
      icon: Laptop,
      description: "Automatically synchronizes with your operating system's light or dark mode preference.",
      previewBg: "linear-gradient(135deg, #F9F8F4 50%, #0B0F17 50%)",
      previewSurface: "linear-gradient(135deg, #FFFFFF 50%, #131926 50%)",
      previewLine: "#334155",
      previewText: "#E8A33D",
    },
  ];

  return (
    <div className="sa-fade-in grid md:grid-cols-[200px_1fr] gap-5">
      <div className="sa-card p-3 h-fit">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="w-full text-left px-3 py-2 rounded-lg text-sm mb-1 font-medium transition-colors"
            style={{
              background: tab === t ? "var(--surface-subtle)" : "transparent",
              color: tab === t ? "var(--accent)" : "var(--text)",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="sa-card sa-card-lg p-6">
        {tab === "Profile" && (
          <div className="space-y-4 max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold" style={{ background: "var(--accent)", color: "var(--accent-ink)" }}>
                <span>{user?.full_name?.slice(0, 2).toUpperCase() || "EV"}</span>
              </div>
              <button className="sa-btn-outline text-xs px-3 py-1.5 font-medium">Change photo</button>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>Name</label>
              <input defaultValue={user?.full_name || ""} className="w-full mt-1.5 px-3 py-2 rounded-lg text-sm outline-none border" style={{ borderColor: "var(--line)", background: "var(--input-bg)", color: "var(--text)" }} />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>Course</label>
              <input defaultValue="B.Tech Computer Science, Sem 5" className="w-full mt-1.5 px-3 py-2 rounded-lg text-sm outline-none border" style={{ borderColor: "var(--line)", background: "var(--input-bg)", color: "var(--text)" }} />
            </div>
            <button onClick={() => showToast("Profile saved")} className="sa-btn-primary px-4 py-2 text-sm font-medium">Save changes</button>
          </div>
        )}

        {tab === "Appearance" && (
          <div className="max-w-xl space-y-6">
            <div>
              <h3 className="sa-serif text-lg font-semibold mb-1">Theme Preferences</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                Choose how ExamVault looks to you. Seamlessly switch between Light and Dark mode, or let your system dictate the theme.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {themeCards.map((item) => {
                const isSelected = theme === item.id;
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleThemeChange(item.id)}
                    className="sa-card p-4 flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] relative group"
                    style={{
                      borderColor: isSelected ? "var(--accent)" : "var(--line)",
                      background: isSelected ? "var(--surface-subtle)" : "var(--surface)",
                      boxShadow: isSelected ? "0 0 0 1.5px var(--accent)" : "none",
                    }}
                  >
                    <div>
                      {/* Mini Theme Palette Visual Preview */}
                      <div
                        className="w-full h-16 rounded-lg mb-3 p-2 flex flex-col justify-between border relative overflow-hidden"
                        style={{
                          background: item.previewBg,
                          borderColor: item.previewLine,
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "var(--accent)" }}>
                            <Icon size={10} color="#1A1408" />
                          </div>
                          {isSelected && (
                            <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "var(--accent)" }}>
                              <Check size={10} color="#1A1408" />
                            </div>
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="h-2 w-3/4 rounded" style={{ background: "var(--accent)", opacity: 0.6 }} />
                          <div className="h-1.5 w-1/2 rounded" style={{ background: item.previewLine }} />
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm" style={{ color: isSelected ? "var(--accent)" : "var(--text)" }}>
                          {item.label}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "var(--accent-soft)", color: "var(--accent-ink)" }}>
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === "Notifications" && (
          <div className="max-w-md space-y-4">
            {[["reminders", "Daily study reminders"], ["weekly", "Weekly progress email"], ["streak", "Streak-at-risk alerts"]].map(([key, label]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm">{label}</span>
                <button
                  onClick={() => setNotifs({ ...notifs, [key]: !notifs[key] })}
                  className="w-10 h-6 rounded-full relative transition-colors"
                  style={{ background: notifs[key] ? "var(--accent)" : "var(--line)" }}
                >
                  <span
                    className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all shadow-sm"
                    style={{ left: notifs[key] ? 18 : 2 }}
                  />
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === "Study Preferences" && (
          <div className="max-w-md space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>Default quiz difficulty</label>
              <div className="grid grid-cols-3 gap-2 mt-1.5">
                {["Easy", "Medium", "Hard"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className="sa-option-card py-2 text-sm font-medium"
                    style={difficulty === d ? { borderColor: "var(--accent)", background: "var(--surface-subtle)" } : {}}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>Language</label>
              <select className="w-full mt-1.5 px-3 py-2 rounded-lg text-sm outline-none border" style={{ borderColor: "var(--line)", background: "var(--input-bg)", color: "var(--text)" }}>
                <option>English</option><option>Hindi</option><option>Marathi</option>
              </select>
            </div>
          </div>
        )}

        {tab === "Account" && (
          <div className="max-w-md space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>Email</label>
              <input defaultValue={user?.email || ""} className="w-full mt-1.5 px-3 py-2 rounded-lg text-sm outline-none border" style={{ borderColor: "var(--line)", background: "var(--input-bg)", color: "var(--text)" }} />
            </div>
            <button className="text-sm font-medium px-4 py-2 rounded-lg" style={{ color: "var(--danger)", border: "1px solid var(--danger)" }}>Delete account</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingsPage;
