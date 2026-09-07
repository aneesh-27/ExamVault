import React from "react";
import {
  GraduationCap, Upload, HelpCircle, BookOpen, MessageSquare, Layers,
  ClipboardList, Calendar,
} from "lucide-react";
import { Badge, ProgressBar } from "./UI";
import ThemeToggle from "./ThemeToggle";

function Landing({ onEnter }) {
  const features = [
    { icon: HelpCircle, title: "AI Quiz Generator", desc: "Turn any chapter into a targeted quiz in seconds, scored and explained." },
    { icon: BookOpen, title: "Topic-wise Summaries", desc: "Structured overviews, definitions and formulas pulled straight from your notes." },
    { icon: MessageSquare, title: "Document-based AI Chat", desc: "Ask questions and get answers grounded in the material you uploaded." },
    { icon: Layers, title: "Smart Flashcards", desc: "Auto-generated recall cards that adapt to what you keep missing." },
    { icon: ClipboardList, title: "Mock Exams", desc: "Full-length timed exams that mirror the real thing, down to the palette." },
    { icon: Calendar, title: "Personalized Study Planner", desc: "A day-by-day plan built around your exam date and free hours." },
  ];
  return (
    <div className="sa-root min-h-screen">
      <header className="max-w-6xl mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--ink)" }}>
            <GraduationCap size={18} color="var(--accent)" />
          </div>
          <span className="sa-serif text-lg font-semibold">ExamVault</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button onClick={onEnter} className="sa-btn-outline text-sm font-medium px-4 py-2">Open dashboard</button>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 pt-10 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="sa-serif text-4xl md:text-5xl font-semibold leading-tight mb-5">
            Turn your notes into your personal AI exam coach.
          </h1>
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
            Upload your study material and let AI transform it into quizzes, summaries, flashcards,
            revision plans and personalized explanations.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={onEnter} className="sa-btn-accent px-5 py-3 text-sm flex items-center gap-2">
              <Upload size={16} /> Upload Study Material
            </button>
            <button onClick={onEnter} className="sa-btn-outline px-5 py-3 text-sm font-medium">Explore Features</button>
          </div>
          <div className="flex items-center gap-6 mt-9">
            <div><div className="sa-serif text-2xl font-semibold">40k+</div><div className="text-xs" style={{ color: "var(--muted)" }}>Documents processed</div></div>
            <div className="w-px h-8" style={{ background: "var(--line)" }} />
            <div><div className="sa-serif text-2xl font-semibold">2.1M</div><div className="text-xs" style={{ color: "var(--muted)" }}>Quiz questions generated</div></div>
          </div>
        </div>

        <div className="sa-card sa-card-lg p-4 shadow-sm" style={{ boxShadow: "0 20px 50px var(--shadow-color)" }}>
          <div className="rounded-xl p-4" style={{ background: "var(--ink)" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium" style={{ color: "#C7CEE0" }}>Continue Learning</span>
              <Badge tone="accent">68%</Badge>
            </div>
            <div className="sa-serif text-white text-lg font-medium mb-3">Engineering Mathematics</div>
            <ProgressBar value={68} tone="accent" />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {[["Quizzes", "12"], ["Avg Score", "78%"], ["Streak", "5 days"], ["Questions", "145"]].map(([label, val]) => (
              <div key={label} className="rounded-lg p-3" style={{ background: "var(--surface-subtle)" }}>
                <div className="sa-serif text-xl font-semibold">{val}</div>
                <div className="text-xs" style={{ color: "var(--muted)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="sa-serif text-2xl font-semibold mb-8">Everything you need before exam day</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} className="sa-card p-5">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: "var(--accent-soft)" }}>
                <f.icon size={17} color="var(--accent-ink)" />
              </div>
              <div className="font-semibold text-sm mb-1">{f.title}</div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


export default Landing;
