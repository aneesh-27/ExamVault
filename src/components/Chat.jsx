import React, { useState, useEffect, useRef } from "react";
import { Send, Lightbulb, FileText } from "lucide-react";
import { MOCK_AI_RESPONSES } from "../data/mockData";

function StructuredAIResponse({ text }) {
  // text is a lightweight markdown-ish structure
  const lines = text.split("\n");
  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {lines.map((line, i) => {
        if (line.startsWith("### ")) return <h4 key={i} className="sa-serif text-base font-semibold mt-1">{line.slice(4)}</h4>;
        if (line.startsWith("**") && line.endsWith("**")) return <div key={i} className="font-semibold text-xs uppercase tracking-wide mt-2" style={{ color: "var(--muted)" }}>{line.slice(2, -2)}</div>;
        if (/^\d+\./.test(line)) return <div key={i} className="pl-1">{line}</div>;
        if (line.startsWith("- ")) return <div key={i} className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />{line.slice(2)}</div>;
        if (line.startsWith("FORMULA:")) return <div key={i} className="sa-serif text-sm px-3 py-2 rounded-lg my-1 font-medium" style={{ background: "var(--surface-subtle)", border: "1px solid var(--line)" }}>{line.slice(8)}</div>;
        if (line.startsWith("TIP:")) return (
          <div key={i} className="flex items-start gap-2 text-xs rounded-lg px-3 py-2 mt-2" style={{ background: "var(--accent-soft)", color: "var(--accent-ink)" }}>
            <Lightbulb size={13} className="flex-shrink-0 mt-0.5" /> {line.slice(4)}
          </div>
        );
        if (line.trim() === "") return null;
        return <p key={i}>{line}</p>;
      })}
    </div>
  );
}

function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "ai", text: `### Welcome back\nI'm grounded in **Computer Networks.pdf**. Ask me anything from the document — definitions, worked examples, or exam-style questions.` },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [messages, typing]);

  const send = (text) => {
    const msg = text ?? input;
    if (!msg.trim()) return;
    setMessages((m) => [...m, { role: "user", text: msg }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const key = msg.toLowerCase().includes("transformer") ? "transformer" : "default";
      const topic = msg.length > 40 ? msg.slice(0, 40) + "…" : msg;
      const resp = MOCK_AI_RESPONSES[key].replace("{TOPIC}", topic);
      setMessages((m) => [...m, { role: "ai", text: resp }]);
      setTyping(false);
    }, 1100);
  };

  const suggested = ["Explain this topic like I'm a beginner", "Give me a 5-mark answer", "What are the important formulas?", "Quiz me on this topic"];
  const quickTools = ["Explain simply", "Give an example", "Make it exam-ready", "Generate questions", "Summarize this"];

  return (
    <div className="sa-fade-in grid md:grid-cols-[220px_1fr] gap-5 h-[calc(100vh-160px)]">
      <div className="sa-card p-4 h-fit hidden md:block">
        <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--muted)" }}>Grounded in</div>
        <div className="flex items-center gap-2 mb-4">
          <FileText size={16} color="var(--accent)" />
          <span className="text-sm font-medium truncate">Computer Networks.pdf</span>
        </div>
        <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--muted)" }}>Topic</div>
        <select className="w-full px-2 py-2 rounded-lg text-sm outline-none border" style={{ borderColor: "var(--line)", background: "var(--input-bg)", color: "var(--text)" }}>
          <option>All Topics</option>
          <option>OSI Model</option>
          <option>TCP/IP</option>
        </select>
      </div>

      <div className="sa-card sa-card-lg flex flex-col overflow-hidden">
        <div ref={scrollRef} className="flex-1 overflow-y-auto sa-scroll p-5 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="max-w-[85%] rounded-2xl px-4 py-3"
                style={m.role === "user" ? { background: "var(--ink-btn)", color: "var(--ink-btn-text)", borderBottomRightRadius: 4 } : { background: "var(--surface-subtle)", color: "var(--text)", borderBottomLeftRadius: 4 }}>
                {m.role === "user" ? <p className="text-sm">{m.text}</p> : <StructuredAIResponse text={m.text} />}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="rounded-2xl px-4 py-3 flex gap-1" style={{ background: "var(--surface-subtle)" }}>
                {[0, 1, 2].map((i) => <span key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--muted)", animation: `saFadeIn 1s ${i * 0.15}s infinite alternate` }} />)}
              </div>
            </div>
          )}
        </div>

        {messages.length < 2 && (
          <div className="px-5 pb-2 flex flex-wrap gap-2">
            {suggested.map((s) => (
              <button key={s} onClick={() => send(s)} className="sa-btn-outline text-xs px-3 py-1.5 font-medium">{s}</button>
            ))}
          </div>
        )}

        <div className="px-5 pb-2 flex flex-wrap gap-2">
          {quickTools.map((t) => (
            <button key={t} onClick={() => send(t + ": " + (messages.filter(m => m.role === 'user').slice(-1)[0]?.text || "this topic"))}
              className="text-xs px-2.5 py-1 rounded-full font-medium transition-transform hover:scale-105" style={{ background: "var(--accent-soft)", color: "var(--accent-ink)" }}>
              {t}
            </button>
          ))}
        </div>

        <div className="p-4 border-t flex items-center gap-2" style={{ borderColor: "var(--line)" }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask anything about your study material..."
            className="flex-1 px-4 py-2.5 rounded-full text-sm outline-none border" style={{ borderColor: "var(--line)", background: "var(--input-bg)", color: "var(--text)" }} />
          <button onClick={() => send()} className="sa-btn-accent p-2.5 rounded-full flex-shrink-0"><Send size={16} /></button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
