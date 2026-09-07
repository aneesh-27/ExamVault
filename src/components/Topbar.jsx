import React, { useState } from "react";
import { Menu, Search, Bell, User } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

function Topbar({ title, subtitle, onMenuClick }) {
  const [accountOpen, setAccountOpen] = useState(false);
  const { user, logout } = useAuth();
  const initials = user?.full_name?.slice(0, 2).toUpperCase() || "EV";

  return (
    <div className="sa-card border-x-0 border-t-0 px-4 md:px-8 py-4 flex items-center justify-between flex-shrink-0" style={{ borderRadius: 0 }}>
      <div className="flex items-center gap-3 min-w-0">
        <button className="md:hidden sa-btn-outline p-2" onClick={onMenuClick}><Menu size={18} /></button>
        <div className="min-w-0">
          <h1 className="sa-serif text-lg md:text-xl font-semibold truncate">{title}</h1>
          {subtitle && <p className="text-xs md:text-sm truncate" style={{ color: "var(--muted)" }}>{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border" style={{ background: "var(--input-bg)", borderColor: "var(--line)", width: 220 }}>
          <Search size={14} color="var(--muted)" />
          <input placeholder="Search documents, topics..." className="bg-transparent text-sm outline-none w-full" style={{ color: "var(--text)" }} />
        </div>
        <ThemeToggle />
        <button className="sa-btn-outline p-2 relative" title="Notifications" aria-label="Notifications">
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
        </button>
        <div className="relative">
          <button onClick={() => setAccountOpen((open) => !open)} className="w-8 h-8 rounded-full flex items-center justify-center font-bold" style={{ background: "var(--accent)", color: "var(--accent-ink)" }} aria-label="Open account menu" aria-expanded={accountOpen}>
            {user ? <span className="text-xs">{initials}</span> : <User size={14} />}
          </button>
          {accountOpen && (
            <div className="absolute right-0 top-10 z-50 w-52 sa-card p-2 shadow-xl sa-fade-in">
              <div className="px-2 py-2 border-b mb-1" style={{ borderColor: "var(--line)" }}>
                <div className="text-sm font-semibold truncate">{user?.full_name || "Account"}</div>
                <div className="text-xs truncate" style={{ color: "var(--muted)" }}>{user?.email}</div>
                <div className="text-xs mt-1" style={{ color: "var(--accent-ink)" }}>{user?.reputation_credits ?? 0} Vault Credits</div>
              </div>
              <button onClick={logout} className="w-full text-left px-2 py-2 rounded-lg text-sm font-medium hover:bg-[var(--surface-subtle)]" style={{ color: "var(--danger)" }}>Log out</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default Topbar;
