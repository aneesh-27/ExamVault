import React, { useState, useEffect, useMemo } from "react";
import { Clock, Flag, ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "./UI";
import { QUIZ_BANK } from "../data/mockData";

function QuizRun({ go, config, onFinish, fullScreenTitle }) {
  const questions = useMemo(() => {
    const n = config.count || 10;
    const pool = [];
    for (let i = 0; i < n; i++) pool.push(QUIZ_BANK[i % QUIZ_BANK.length]);
    return pool;
  }, [config.count]);

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({});
  const [seconds, setSeconds] = useState(config.count === 20 ? 2400 : config.count === 5 ? 600 : 1200);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [seconds > 0]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const q = questions[current];

  const select = (optIdx) => setAnswers({ ...answers, [current]: optIdx });
  const toggleMark = () => setMarked({ ...marked, [current]: !marked[current] });

  const submit = () => {
    let correct = 0;
    questions.forEach((qq, i) => { if (answers[i] === qq.correct) correct++; });
    onFinish({ questions, answers, correct, total: questions.length, timeTaken: (config.count === 20 ? 2400 : config.count === 5 ? 600 : 1200) - seconds });
  };

  const status = (i) => {
    if (i === current) return "current";
    if (marked[i]) return "marked";
    if (answers[i] !== undefined) return "answered";
    return "unattempted";
  };
  const statusStyle = {
    current: { background: "var(--ink)", color: "#fff" },
    answered: { background: "var(--success)", color: "#fff" },
    marked: { background: "var(--accent)", color: "var(--accent-ink)" },
    unattempted: { background: "#EFEDE6", color: "var(--text)" },
  };

  return (
    <div className="sa-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-5">
        <div>
          <h2 className="sa-serif text-xl font-semibold">{fullScreenTitle || "Computer Networks Quiz"}</h2>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>Question {current + 1} of {questions.length}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: seconds < 60 ? "var(--danger-soft)" : "#EFEDE6" }}>
          <Clock size={15} color={seconds < 60 ? "var(--danger)" : "var(--text)"} />
          <span className="text-sm font-mono font-semibold" style={{ color: seconds < 60 ? "var(--danger)" : "var(--text)" }}>{mm}:{ss}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_260px] gap-5">
        <div className="sa-card sa-card-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge tone="info">{q.topic}</Badge>
            {marked[current] && <Badge tone="accent"><Flag size={11} /> Marked</Badge>}
          </div>
          <h3 className="text-base font-medium leading-relaxed mb-6">{q.q}</h3>
          <div className="space-y-2.5">
            {q.options.map((opt, i) => (
              <div key={i} onClick={() => select(i)}
                className={`sa-option-card px-4 py-3 flex items-center gap-3 text-sm ${answers[current] === i ? "selected" : ""}`}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold"
                  style={{ border: "1.5px solid " + (answers[current] === i ? "var(--ink)" : "#CFCBBB"), background: answers[current] === i ? "var(--ink)" : "transparent", color: answers[current] === i ? "#fff" : "var(--muted)" }}>
                  {String.fromCharCode(65 + i)}
                </div>
                <span>{opt}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-8 flex-wrap gap-2">
            <button disabled={current === 0} onClick={() => setCurrent(current - 1)}
              className="sa-btn-outline px-4 py-2 text-sm font-medium flex items-center gap-1.5 disabled:opacity-40">
              <ArrowLeft size={14} /> Previous
            </button>
            <button onClick={toggleMark} className="sa-btn-outline px-4 py-2 text-sm font-medium flex items-center gap-1.5">
              <Flag size={14} /> {marked[current] ? "Unmark" : "Mark for Review"}
            </button>
            {current === questions.length - 1 ? (
              <button onClick={submit} className="sa-btn-accent px-5 py-2 text-sm font-medium">Submit</button>
            ) : (
              <button onClick={() => setCurrent(current + 1)} className="sa-btn-primary px-4 py-2 text-sm font-medium flex items-center gap-1.5">
                Next <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="sa-card sa-card-lg p-4 h-fit">
          <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--muted)" }}>Question Palette</div>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {questions.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className="w-full aspect-square rounded-lg text-xs font-semibold flex items-center justify-center"
                style={statusStyle[status(i)]}>
                {i + 1}
              </button>
            ))}
          </div>
          <div className="space-y-1.5 text-xs">
            {[["Answered", "var(--success)"], ["Marked", "var(--accent)"], ["Current", "var(--ink)"], ["Not attempted", "#EFEDE6"]].map(([label, color]) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ background: color, border: label === "Not attempted" ? "1px solid #D8D5C9" : "none" }} />
                <span style={{ color: "var(--muted)" }}>{label}</span>
              </div>
            ))}
          </div>
          <button onClick={submit} className="sa-btn-primary w-full mt-4 py-2 text-sm font-medium">Submit {fullScreenTitle ? "Exam" : "Quiz"}</button>
        </div>
      </div>
    </div>
  );
}


export default QuizRun;
