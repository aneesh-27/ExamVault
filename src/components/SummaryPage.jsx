import React, { useState, useEffect } from "react";
import { Zap, BookOpen, Upload, FileText } from "lucide-react";
import { getDocuments, getDocumentTopics } from "../services/api";
import { EmptyState } from "./UI";

function SummaryPage({ go, accessToken }) {
  const [topics, setTopics] = useState([]);
  const [activeTopic, setActiveTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSummaries() {
      if (!accessToken) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const docsRes = await getDocuments(accessToken);
        const docs = (docsRes.documents || []).filter((d) => d.status === "completed");

        if (docs.length > 0) {
          // Fetch topics from user's documents in Neon
          const allTopicLists = await Promise.all(
            docs.map((d) => getDocumentTopics(d.id, accessToken).catch(() => ({ topics: [] })))
          );
          const aggregated = allTopicLists.flatMap((tRes) => tRes.topics || []);
          setTopics(aggregated);
          if (aggregated.length > 0) {
            setActiveTopic(aggregated[0]);
          }
        }
      } catch (err) {
        console.warn("Could not load summaries from backend:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSummaries();
  }, [accessToken]);

  if (loading) {
    return (
      <div className="sa-fade-in text-center py-12 text-sm" style={{ color: "var(--muted)" }}>
        Loading AI topic summaries from Neon database...
      </div>
    );
  }

  if (topics.length === 0) {
    return (
      <div className="sa-fade-in max-w-xl mx-auto py-12">
        <EmptyState
          icon={BookOpen}
          title="No Topic Summaries Yet"
          description="Upload your textbook or syllabus to automatically extract structured chapter summaries with Ollama."
          action={
            <button onClick={() => go("upload")} className="sa-btn-accent px-5 py-2.5 text-xs font-semibold flex items-center gap-1.5">
              <Upload size={14} /> Upload Study Document
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="sa-fade-in grid md:grid-cols-[240px_1fr] gap-5">
      <div className="sa-card p-3 h-fit">
        <div className="text-xs font-semibold uppercase tracking-wide px-2 py-1 mb-2" style={{ color: "var(--muted)" }}>
          Course Topics ({topics.length})
        </div>
        <div className="space-y-1 max-h-[70vh] overflow-y-auto sa-scroll pr-1">
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTopic(t)}
              className="w-full text-left px-3 py-2 rounded-lg text-xs mb-1 font-medium transition-colors truncate"
              style={{
                background: activeTopic?.id === t.id ? "var(--ink-btn)" : "transparent",
                color: activeTopic?.id === t.id ? "var(--ink-btn-text)" : "var(--text)",
              }}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <div className="sa-card sa-card-lg p-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <h2 className="sa-serif text-xl font-semibold">{activeTopic?.name}</h2>
              <span className="text-xs" style={{ color: "var(--muted)" }}>Extracted by Ollama from Neon DB</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => go("quiz-setup")} className="sa-btn-outline text-xs px-3 py-1.5 font-medium">
                Generate Questions
              </button>
              <button onClick={() => go("flashcards")} className="sa-btn-outline text-xs px-3 py-1.5 font-medium">
                Study Flashcards
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--muted)" }}>
              Summary & Core Intuition
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
              {activeTopic?.summary || "Comprehensive analysis of this topic derived from your uploaded lecture notes and reference textbook."}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-1.5" style={{ color: "var(--accent)" }}>
              <Zap size={13} /> High-Yield Revision Focus
            </h3>
            <div className="p-4 rounded-xl border text-xs leading-relaxed space-y-1" style={{ background: "var(--surface-subtle)", borderColor: "var(--line)" }}>
              <p>• Focus on definitions, core derivations, and standard problem templates for <strong>{activeTopic?.name}</strong>.</p>
              <p>• Review related active recall flashcards before testing your understanding in a timed diagnostic quiz.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryPage;
