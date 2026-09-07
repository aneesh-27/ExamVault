import React from "react";
import {
  Target, HelpCircle, PenLine, Award, Flame, BookOpen, MessageSquare,
  Layers, ArrowRight, FileText,
} from "lucide-react";
import { ProgressBar, Badge } from "./UI";
import { DOCUMENTS } from "../data/mockData";
import { useAuth } from "../context/AuthContext";

function Dashboard({ go, showToast }) {
  const { user } = useAuth();
  const stats = [
    { label: "Overall Progress", value: "72%", icon: Target, tone: "accent" },
    { label: "Quizzes Completed", value: "12", icon: HelpCircle, tone: "info" },
    { label: "Questions Attempted", value: "145", icon: PenLine, tone: "muted" },
    { label: "Average Score", value: "78%", icon: Award, tone: "success" },
    { label: "Current Streak", value: "5 days", icon: Flame, tone: "danger" },
  ];
  const quickActions = [
    { label: "Generate Quiz", icon: HelpCircle, page: "quiz-setup" },
    { label: "Create Summary", icon: BookOpen, page: "summary" },
    { label: "Ask AI", icon: MessageSquare, page: "chat" },
    { label: "Create Flashcards", icon: Layers, page: "flashcards" },
  ];

  return (
    <div className="sa-fade-in space-y-6">
      <div>
        <h2 className="sa-serif text-2xl font-semibold">Good morning, {user?.full_name || "there"} 👋</h2>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>Ready to continue your preparation?</p>
        <p className="text-xs mt-2" style={{ color: "var(--accent-ink)" }}>{user?.reputation_credits ?? 0} Vault Credits</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="sa-card p-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
              style={{
                background: s.tone === "accent" ? "var(--accent-soft)" : s.tone === "success" ? "var(--success-soft)" : s.tone === "danger" ? "var(--danger-soft)" : s.tone === "info" ? "var(--info-soft)" : "var(--chip-bg)"
              }}>
              <s.icon size={15} color={s.tone === "accent" ? "var(--accent)" : s.tone === "success" ? "var(--success)" : s.tone === "danger" ? "var(--danger)" : s.tone === "info" ? "var(--info)" : "var(--muted)"} />
            </div>
            <div className="sa-serif text-xl font-semibold">{s.value}</div>
            <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 sa-card sa-card-lg p-5" style={{ background: "var(--ink)", borderColor: "var(--line)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>Continue learning</span>
              <h3 className="sa-serif text-white text-xl font-semibold mt-1">Engineering Mathematics</h3>
            </div>
            <Badge tone="accent">68% complete</Badge>
          </div>
          <ProgressBar value={68} tone="accent" height={10} />
          <div className="flex items-center justify-between mt-5">
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>Next: Laplace Transforms · 40% mastery</span>
            <button onClick={() => go("documents")} className="sa-btn-accent px-4 py-2 text-sm flex items-center gap-2">
              Continue Studying <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div className="sa-card sa-card-lg p-5">
          <h3 className="font-semibold text-sm mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((a) => (
              <button key={a.label} onClick={() => go(a.page)}
                className="sa-btn-outline flex flex-col items-start gap-2 p-3 text-left transition-all hover:scale-[1.02]">
                <a.icon size={16} color="var(--accent)" />
                <span className="text-xs font-medium leading-tight">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm">Recent Documents</h3>
          <button onClick={() => go("documents")} className="text-xs font-medium flex items-center gap-1 hover:underline" style={{ color: "var(--info)" }}>
            View all <ArrowRight size={12} />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {DOCUMENTS.slice(0, 4).map((d) => (
            <div key={d.id} className="sa-card p-4 flex flex-col">
              <div className="flex items-start gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "var(--chip-bg)" }}>
                  <FileText size={14} color="var(--accent)" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{d.name}</div>
                  <div className="text-xs" style={{ color: "var(--muted)" }}>{d.pages} pages · {d.topicsDetected} topics</div>
                </div>
              </div>
              <div className="text-xs mb-3" style={{ color: "var(--muted)" }}>Uploaded {d.uploadedAt}</div>
              <div className="flex gap-2 mt-auto">
                <button onClick={() => go("documents")} className="sa-btn-primary flex-1 text-xs py-1.5 font-medium">Study</button>
                <button onClick={() => go("chat")} className="sa-btn-outline flex-1 text-xs py-1.5 font-medium">Chat</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
