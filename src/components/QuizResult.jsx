import React from "react";
import { Award, Lightbulb, RotateCcw, Eye, HelpCircle } from "lucide-react";
import { ProgressBar, Badge, EmptyState } from "./UI";

function QuizResult({ go, result, showToast }) {
  if (!result) return <EmptyState icon={HelpCircle} title="No quiz results yet" description="Take a quiz to see your results here." action={<button onClick={() => go("quiz-setup")} className="sa-btn-accent px-4 py-2 text-sm">Start a Quiz</button>} />;

  const { correct, total, timeTaken, questions, answers } = result;
  const pct = Math.round((correct / total) * 100);
  const topicMap = {};
  questions.forEach((q, i) => {
    if (!topicMap[q.topic]) topicMap[q.topic] = { correct: 0, total: 0 };
    topicMap[q.topic].total++;
    if (answers[i] === q.correct) topicMap[q.topic].correct++;
  });
  const topicPerf = Object.entries(topicMap).map(([topic, v]) => ({ topic, pct: Math.round((v.correct / v.total) * 100) }));
  const weak = topicPerf.filter((t) => t.pct < 70).sort((a, b) => a.pct - b.pct);
  const mm = String(Math.floor(timeTaken / 60)).padStart(2, "0");
  const ss = String(timeTaken % 60).padStart(2, "0");

  return (
    <div className="sa-fade-in max-w-3xl mx-auto space-y-6">
      <div className="sa-card sa-card-lg p-8 text-center">
        <Award size={28} color="var(--accent-ink)" className="mx-auto mb-3" />
        <h2 className="sa-serif text-2xl font-semibold mb-1">Quiz Completed!</h2>
        <div className="sa-serif text-5xl font-bold my-4">{correct} / {total}</div>
        <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
          <div><span className="font-semibold">{pct}%</span> <span style={{ color: "var(--muted)" }}>Accuracy</span></div>
          <div><span className="font-semibold" style={{ color: "var(--success)" }}>{correct}</span> <span style={{ color: "var(--muted)" }}>Correct</span></div>
          <div><span className="font-semibold" style={{ color: "var(--danger)" }}>{total - correct}</span> <span style={{ color: "var(--muted)" }}>Incorrect</span></div>
          <div><span className="font-semibold">{mm}:{ss}</span> <span style={{ color: "var(--muted)" }}>Time taken</span></div>
        </div>
      </div>

      <div className="sa-card sa-card-lg p-6">
        <h3 className="font-semibold text-sm mb-4">Topic Performance</h3>
        <div className="space-y-3">
          {topicPerf.map((t) => (
            <div key={t.topic}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span>{t.topic}</span>
                <span className="font-medium">{t.pct}%</span>
              </div>
              <ProgressBar value={t.pct} tone={t.pct >= 70 ? "success" : "accent"} height={7} />
            </div>
          ))}
        </div>
      </div>

      {weak.length > 0 && (
        <div className="sa-card sa-card-lg p-6" style={{ background: "var(--accent-soft)" }}>
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={16} color="var(--accent-ink)" />
            <h3 className="font-semibold text-sm" style={{ color: "var(--accent-ink)" }}>Recommended Revision</h3>
          </div>
          <p className="text-sm" style={{ color: "var(--accent-ink)" }}>
            Focus on {weak.map((w) => w.topic).join(", ")} — these scored below 70% this attempt.
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-3 justify-center">
        <button onClick={() => go("quiz-run")} className="sa-btn-outline px-5 py-2.5 text-sm font-medium flex items-center gap-2"><RotateCcw size={15} /> Retry Quiz</button>
        <button onClick={() => showToast("Opening answer review")} className="sa-btn-outline px-5 py-2.5 text-sm font-medium flex items-center gap-2"><Eye size={15} /> Review Answers</button>
        <button onClick={() => go("flashcards")} className="sa-btn-accent px-5 py-2.5 text-sm font-medium">Study Weak Topics</button>
      </div>
    </div>
  );
}


export default QuizResult;
