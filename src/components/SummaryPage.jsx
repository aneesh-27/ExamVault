import React, { useState } from "react";
import { Zap } from "lucide-react";
import { SUMMARY_CONTENT } from "../data/mockData";

function SummaryPage({ go }) {
  const topics = Object.keys(SUMMARY_CONTENT);
  const [active, setActive] = useState(topics[0]);
  const s = SUMMARY_CONTENT[active];

  return (
    <div className="sa-fade-in grid md:grid-cols-[220px_1fr] gap-5">
      <div className="sa-card p-3 h-fit">
        <div className="text-xs font-semibold uppercase tracking-wide px-2 py-1 mb-1" style={{ color: "var(--muted)" }}>Topics</div>
        {topics.map((t) => (
          <button key={t} onClick={() => setActive(t)}
            className="w-full text-left px-3 py-2 rounded-lg text-sm mb-1 font-medium"
            style={{ background: active === t ? "#F4F2EC" : "transparent", color: active === t ? "var(--ink)" : "var(--text)" }}>
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        <div className="sa-card sa-card-lg p-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="sa-serif text-xl font-semibold">{active}</h2>
            <div className="flex gap-2">
              <button className="sa-btn-outline text-xs px-3 py-1.5 font-medium">Simplify Explanation</button>
              <button onClick={() => go("quiz-setup")} className="sa-btn-outline text-xs px-3 py-1.5 font-medium">Generate Questions</button>
              <button onClick={() => go("flashcards")} className="sa-btn-outline text-xs px-3 py-1.5 font-medium">Add to Flashcards</button>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--muted)" }}>Overview</h3>
            <p className="text-sm leading-relaxed">{s.overview}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--muted)" }}>Key Concepts</h3>
            <ul className="space-y-1.5">
              {s.concepts.map((c, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--ink)" }} />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--muted)" }}>Important Definitions</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {s.definitions.map(([term, def]) => (
                <div key={term} className="rounded-lg p-3" style={{ background: "#F4F2EC" }}>
                  <div className="text-sm font-semibold mb-1">{term}</div>
                  <div className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{def}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-1.5" style={{ color: "var(--accent-ink)" }}><Zap size={12} /> Exam Points</h3>
            <ul className="space-y-1.5">
              {s.examTips.map((t, i) => (
                <li key={i} className="text-sm rounded-lg px-3 py-2" style={{ background: "var(--accent-soft)", color: "var(--accent-ink)" }}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


export default SummaryPage;
