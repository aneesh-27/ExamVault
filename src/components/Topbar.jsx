import React from "react";
import { Menu, Search, Bell, User } from "lucide-react";

function Topbar({ title, subtitle, onMenuClick }) {
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
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "#F1EFE8", width: 220 }}>
          <Search size={14} color="var(--muted)" />
          <input placeholder="Search documents, topics..." className="bg-transparent text-sm outline-none w-full" />
        </div>
        <button className="sa-btn-outline p-2 relative">
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
        </button>
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "var(--ink)" }}>
          <User size={14} color="#fff" />
        </div>
      </div>
    </div>
  );
}


export default Topbar;
