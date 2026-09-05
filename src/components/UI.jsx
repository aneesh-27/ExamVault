import React, { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

// Small shared/presentational building blocks used across pages.

function ProgressBar({ value, tone = "ink", height = 8 }) {
  return (
    <div className="sa-progress-track w-full" style={{ height }}>
      <div className={`sa-progress-fill ${tone === "accent" ? "accent" : tone === "success" ? "success" : ""}`}
        style={{ width: `${value}%`, height: "100%" }} />
    </div>
  );
}

function Badge({ children, tone = "muted" }) {
  const styles = {
    muted: { background: "#EFEDE6", color: "#54596B" },
    accent: { background: "var(--accent-soft)", color: "var(--accent-ink)" },
    success: { background: "var(--success-soft)", color: "var(--success)" },
    danger: { background: "var(--danger-soft)", color: "var(--danger)" },
    info: { background: "#E5EEF7", color: "var(--info)" },
  };
  return <span className="sa-badge" style={styles[tone]}>{children}</span>;
}

function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2600);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="sa-toast fixed bottom-6 right-6 z-50 sa-card px-4 py-3 shadow-lg flex items-center gap-2" style={{ boxShadow: "0 10px 30px rgba(20,33,61,0.15)" }}>
      <CheckCircle2 size={18} color="var(--success)" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}

function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: "#F0EEE6" }}>
        <Icon size={24} color="var(--muted)" />
      </div>
      <h3 className="sa-serif text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm mb-5 max-w-sm" style={{ color: "var(--muted)" }}>{description}</p>
      {action}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="sa-card p-4">
      <div className="h-4 w-2/3 rounded mb-3" style={{ background: "#EFEDE6" }} />
      <div className="h-3 w-1/2 rounded mb-2" style={{ background: "#F2F0E9" }} />
      <div className="h-3 w-1/3 rounded" style={{ background: "#F2F0E9" }} />
    </div>
  );
}

export { ProgressBar, Badge, Toast, EmptyState, SkeletonCard };
