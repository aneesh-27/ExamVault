import React, { useState } from "react";
import { Sparkles, CheckCircle2, Circle } from "lucide-react";
import { Badge } from "./UI";

function Planner() {
  const [examDate, setExamDate] = useState("");
  const [subjects, setSubjects] = useState("Computer Networks, Engineering Mathematics");
  const [hours, setHours] = useState(3);
  const [plan, setPlan] = useState(null);
  const [completed, setCompleted] = useState({});

  const generate = () => {
    const subs = subjects.split(",").map((s) => s.trim()).filter(Boolean);
    const days = [];
    const units = ["Unit 1", "Unit 1 + Quiz", "Unit 2", "Unit 2 + Flashcards", "Unit 3", "Unit 3 + Quiz", "Revision"];
    for (let i = 0; i < 7; i++) {
      const subject = subs[i % subs.length];
      days.push({ day: i + 1, subject, task: units[i], hours });
    }
    days.push({ day: 8, subject: "All Subjects", task: "Full Mock Exam", hours });
    setPlan(days);
    setCompleted({});
  };

  return (
    <div className="sa-fade-in max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="sa-serif text-2xl font-semibold">Study Planner</h2>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>An AI-generated day-by-day plan built around your exam date.</p>
      </div>

      <div className="sa-card sa-card-lg p-6 grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>Exam Date</label>
          <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} className="w-full mt-1.5 px-3 py-2.5 rounded-lg text-sm outline-none" style={{ border: "1px solid var(--line)" }} />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>Study Hours / Day</label>
          <input type="number" min={1} max={12} value={hours} onChange={(e) => setHours(Number(e.target.value))} className="w-full mt-1.5 px-3 py-2.5 rounded-lg text-sm outline-none" style={{ border: "1px solid var(--line)" }} />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>Subjects (comma separated)</label>
          <input value={subjects} onChange={(e) => setSubjects(e.target.value)} className="w-full mt-1.5 px-3 py-2.5 rounded-lg text-sm outline-none" style={{ border: "1px solid var(--line)" }} />
        </div>
        <div className="sm:col-span-2">
          <button onClick={generate} className="sa-btn-accent w-full py-3 text-sm flex items-center justify-center gap-2"><Sparkles size={16} /> Generate Study Plan</button>
        </div>
      </div>

      {plan && (
        <div className="sa-card sa-card-lg p-6">
          <h3 className="font-semibold text-sm mb-4">Your Plan</h3>
          <div className="space-y-2">
            {plan.map((d) => (
              <div key={d.day} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: completed[d.day] ? "var(--success-soft)" : "#F4F2EC" }}>
                <button onClick={() => setCompleted({ ...completed, [d.day]: !completed[d.day] })}>
                  {completed[d.day] ? <CheckCircle2 size={19} color="var(--success)" /> : <Circle size={19} color="var(--muted)" />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${completed[d.day] ? "line-through" : ""}`} style={{ color: completed[d.day] ? "var(--muted)" : "var(--text)" }}>
                    Day {d.day} — {d.task}
                  </div>
                  <div className="text-xs" style={{ color: "var(--muted)" }}>{d.subject} · {d.hours}h</div>
                </div>
                {d.task.includes("Mock") && <Badge tone="danger">Final push</Badge>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


export default Planner;
