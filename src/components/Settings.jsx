import React, { useState } from "react";

function SettingsPage({ showToast }) {
  const [tab, setTab] = useState("Profile");
  const tabs = ["Profile", "Appearance", "Notifications", "Study Preferences", "Account"];
  const [difficulty, setDifficulty] = useState("Medium");
  const [notifs, setNotifs] = useState({ reminders: true, weekly: true, streak: false });

  return (
    <div className="sa-fade-in grid md:grid-cols-[200px_1fr] gap-5">
      <div className="sa-card p-3 h-fit">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className="w-full text-left px-3 py-2 rounded-lg text-sm mb-1 font-medium"
            style={{ background: tab === t ? "#F4F2EC" : "transparent", color: tab === t ? "var(--ink)" : "var(--text)" }}>
            {t}
          </button>
        ))}
      </div>

      <div className="sa-card sa-card-lg p-6">
        {tab === "Profile" && (
          <div className="space-y-4 max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "var(--accent)" }}>
                <span className="font-bold" style={{ color: "var(--accent-ink)" }}>AR</span>
              </div>
              <button className="sa-btn-outline text-xs px-3 py-1.5 font-medium">Change photo</button>
            </div>
            <div><label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>Name</label>
              <input defaultValue="Aarav Rao" className="w-full mt-1.5 px-3 py-2 rounded-lg text-sm outline-none" style={{ border: "1px solid var(--line)" }} /></div>
            <div><label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>Course</label>
              <input defaultValue="B.Tech Computer Science, Sem 5" className="w-full mt-1.5 px-3 py-2 rounded-lg text-sm outline-none" style={{ border: "1px solid var(--line)" }} /></div>
            <button onClick={() => showToast("Profile saved")} className="sa-btn-primary px-4 py-2 text-sm font-medium">Save changes</button>
          </div>
        )}

        {tab === "Appearance" && (
          <div className="max-w-md">
            <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>Theme</label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {["Light", "Dark (coming soon)"].map((th) => (
                <div key={th} className="sa-option-card p-3 text-sm text-center" style={th === "Light" ? { borderColor: "var(--ink)", background: "#F4F2EC" } : { opacity: 0.5, cursor: "not-allowed" }}>{th}</div>
              ))}
            </div>
          </div>
        )}

        {tab === "Notifications" && (
          <div className="max-w-md space-y-4">
            {[["reminders", "Daily study reminders"], ["weekly", "Weekly progress email"], ["streak", "Streak-at-risk alerts"]].map(([key, label]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm">{label}</span>
                <button onClick={() => setNotifs({ ...notifs, [key]: !notifs[key] })}
                  className="w-10 h-6 rounded-full relative transition-colors" style={{ background: notifs[key] ? "var(--ink)" : "#D8D5C9" }}>
                  <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all" style={{ left: notifs[key] ? 18 : 2 }} />
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
                  <button key={d} onClick={() => setDifficulty(d)} className="sa-option-card py-2 text-sm font-medium" style={difficulty === d ? { borderColor: "var(--ink)", background: "#F4F2EC" } : {}}>{d}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>Language</label>
              <select className="w-full mt-1.5 px-3 py-2 rounded-lg text-sm outline-none" style={{ border: "1px solid var(--line)" }}>
                <option>English</option><option>Hindi</option><option>Marathi</option>
              </select>
            </div>
          </div>
        )}

        {tab === "Account" && (
          <div className="max-w-md space-y-4">
            <div><label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>Email</label>
              <input defaultValue="aarav.rao@example.com" className="w-full mt-1.5 px-3 py-2 rounded-lg text-sm outline-none" style={{ border: "1px solid var(--line)" }} /></div>
            <button className="text-sm font-medium px-4 py-2 rounded-lg" style={{ color: "var(--danger)", border: "1px solid var(--danger)" }}>Delete account</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingsPage;
