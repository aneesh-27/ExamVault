import React from "react";
import { Sparkles } from "lucide-react";

function QuizSetup({ go, config, setConfig }) {
  const topics = ["OSI Model", "TCP/IP", "Network Topologies", "Routing Algorithms", "Transport Layer", "Application Layer"];
  return (
    <div className="sa-fade-in max-w-xl mx-auto">
      <h2 className="sa-serif text-2xl font-semibold mb-1">Generate a quiz</h2>
      <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>Configure your quiz, generated from Computer Networks.pdf</p>

      <div className="sa-card sa-card-lg p-6 space-y-5">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>Topic</label>
          <select value={config.topic} onChange={(e) => setConfig({ ...config, topic: e.target.value })}
            className="w-full mt-1.5 px-3 py-2.5 rounded-lg text-sm outline-none" style={{ border: "1px solid var(--line)" }}>
            <option>All Topics</option>
            {topics.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>Difficulty</label>
          <div className="grid grid-cols-3 gap-2 mt-1.5">
            {["Easy", "Medium", "Hard"].map((diff) => (
              <button key={diff} onClick={() => setConfig({ ...config, difficulty: diff })}
                className="py-2 rounded-lg text-sm font-medium sa-option-card"
                style={config.difficulty === diff ? { borderColor: "var(--ink)", background: "#F4F2EC" } : {}}>
                {diff}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>Number of questions</label>
          <div className="grid grid-cols-3 gap-2 mt-1.5">
            {[5, 10, 20].map((n) => (
              <button key={n} onClick={() => setConfig({ ...config, count: n })}
                className="py-2 rounded-lg text-sm font-medium sa-option-card"
                style={config.count === n ? { borderColor: "var(--ink)", background: "#F4F2EC" } : {}}>
                {n}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>Question type</label>
          <div className="grid grid-cols-3 gap-2 mt-1.5">
            {["MCQ", "True/False", "Numerical"].map((t) => (
              <button key={t} onClick={() => setConfig({ ...config, qtype: t })}
                className="py-2 rounded-lg text-xs font-medium sa-option-card"
                style={config.qtype === t ? { borderColor: "var(--ink)", background: "#F4F2EC" } : {}}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <button onClick={() => go("quiz-run")} className="sa-btn-accent w-full py-3 text-sm flex items-center justify-center gap-2">
          <Sparkles size={16} /> Generate Quiz
        </button>
      </div>
    </div>
  );
}


export default QuizSetup;
