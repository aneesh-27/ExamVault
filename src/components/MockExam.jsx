import React, { useState } from "react";
import { ClipboardList, Play } from "lucide-react";
import QuizRun from "./QuizRun";
import QuizResult from "./QuizResult";

function MockExamIntro({ go, setQuizConfig }) {
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState(null);

  if (result) return <QuizResult go={go} result={result} showToast={() => {}} />;
  if (started) return <QuizRun go={go} config={{ topic: "All Topics", count: 20 }} fullScreenTitle="Computer Networks — Full Mock Exam" onFinish={setResult} />;

  return (
    <div className="sa-fade-in max-w-lg mx-auto sa-card sa-card-lg p-8 text-center">
      <ClipboardList size={26} color="var(--ink)" className="mx-auto mb-4" />
      <h2 className="sa-serif text-2xl font-semibold mb-2">Computer Networks — Full Mock Exam</h2>
      <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>20 questions · 40 minutes · covers all detected topics, timed exactly like the real thing.</p>
      <div className="flex items-center justify-center gap-6 text-sm mb-6">
        <div><div className="font-semibold">20</div><div className="text-xs" style={{ color: "var(--muted)" }}>Questions</div></div>
        <div><div className="font-semibold">40:00</div><div className="text-xs" style={{ color: "var(--muted)" }}>Duration</div></div>
        <div><div className="font-semibold">6</div><div className="text-xs" style={{ color: "var(--muted)" }}>Topics</div></div>
      </div>
      <button onClick={() => setStarted(true)} className="sa-btn-accent px-6 py-3 text-sm flex items-center gap-2 mx-auto"><Play size={15} /> Start Mock Exam</button>
    </div>
  );
}

export default MockExamIntro;
