import React from "react";
import { FileText, CheckCircle2, HelpCircle, BookOpen, MessageSquare } from "lucide-react";
import { Badge, ProgressBar } from "./UI";
import { DOCUMENTS } from "../data/mockData";

function Analysis({ go, doc }) {
  const d = doc || DOCUMENTS[1];
  return (
    <div className="sa-fade-in space-y-6">
      <div className="sa-card sa-card-lg p-5 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: "#EFEDE6" }}>
            <FileText size={20} color="var(--ink)" />
          </div>
          <div>
            <h2 className="sa-serif text-lg font-semibold">{d.name}</h2>
            <p className="text-xs" style={{ color: "var(--muted)" }}>{d.pages} pages</p>
          </div>
        </div>
        <Badge tone="success"><CheckCircle2 size={12} /> AI analysis complete</Badge>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-3">Detected Topics</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {d.topics.map((t) => (
            <div key={t.name} className="sa-card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{t.name}</span>
                <span className="text-xs font-semibold" style={{ color: t.mastery >= 70 ? "var(--success)" : t.mastery >= 40 ? "var(--accent-ink)" : "var(--danger)" }}>{t.mastery}%</span>
              </div>
              <ProgressBar value={t.mastery} tone={t.mastery >= 70 ? "success" : t.mastery >= 40 ? "accent" : "ink"} height={6} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-3">AI Actions</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="sa-card sa-card-lg p-5">
            <HelpCircle size={20} color="var(--ink)" className="mb-3" />
            <div className="font-semibold text-sm mb-1">Create Quiz</div>
            <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>Generate questions from this document.</p>
            <button onClick={() => go("quiz-setup")} className="sa-btn-primary w-full text-sm py-2 font-medium">Create Quiz</button>
          </div>
          <div className="sa-card sa-card-lg p-5">
            <BookOpen size={20} color="var(--ink)" className="mb-3" />
            <div className="font-semibold text-sm mb-1">Topic-wise Summary</div>
            <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>Generate structured summaries from the document.</p>
            <button onClick={() => go("summary")} className="sa-btn-primary w-full text-sm py-2 font-medium">Create Summary</button>
          </div>
          <div className="sa-card sa-card-lg p-5">
            <MessageSquare size={20} color="var(--ink)" className="mb-3" />
            <div className="font-semibold text-sm mb-1">Ask AI</div>
            <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>Ask questions about this document.</p>
            <button onClick={() => go("chat")} className="sa-btn-primary w-full text-sm py-2 font-medium">Open Chat</button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Analysis;
