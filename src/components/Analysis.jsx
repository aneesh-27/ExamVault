import React, { useState, useEffect } from "react";
import { FileText, CheckCircle2, HelpCircle, BookOpen, MessageSquare, Upload } from "lucide-react";
import { Badge, ProgressBar, EmptyState } from "./UI";
import { getDocuments, getDocumentTopics } from "../services/api";

function Analysis({ go, doc, selectDoc, accessToken }) {
  const [activeDoc, setActiveDoc] = useState(doc);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDocAndTopics() {
      if (!accessToken) {
        setLoading(false);
        return;
      }
      try {
        let current = activeDoc;
        if (!current) {
          const docRes = await getDocuments(accessToken);
          const docs = (docRes.documents || []).filter((d) => d.status === "completed");
          if (docs.length > 0) {
            current = docs[0];
            setActiveDoc(current);
            if (selectDoc) selectDoc(current);
          }
        }

        if (current?.id) {
          const tRes = await getDocumentTopics(current.id, accessToken);
          setTopics(tRes.topics || []);
        }
      } catch (err) {
        console.warn("Could not load analysis:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDocAndTopics();
  }, [activeDoc, accessToken, selectDoc]);

  if (loading) {
    return (
      <div className="sa-fade-in text-center py-12 text-sm" style={{ color: "var(--muted)" }}>
        Loading document analysis from Neon DB...
      </div>
    );
  }

  if (!activeDoc) {
    return (
      <div className="sa-fade-in max-w-xl mx-auto py-12">
        <EmptyState
          icon={FileText}
          title="No Document Selected for Analysis"
          description="Upload a study document to automatically detect core syllabus topics and evaluate topic readiness."
          action={
            <button onClick={() => go("upload")} className="sa-btn-accent px-5 py-2.5 text-xs font-semibold flex items-center gap-1.5">
              <Upload size={14} /> Upload Study Material
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="sa-fade-in space-y-6">
      <div className="sa-card sa-card-lg p-5 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-amber-500/10 text-amber-500">
            <FileText size={20} />
          </div>
          <div>
            <h2 className="sa-serif text-lg font-semibold">{activeDoc.filename || activeDoc.name}</h2>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              {activeDoc.file_size ? `${(activeDoc.file_size / 1024 / 1024).toFixed(1)} MB` : "Document"} · {topics.length} topics detected
            </p>
          </div>
        </div>
        <Badge tone="success"><CheckCircle2 size={12} /> AI analysis complete</Badge>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-3">Detected Topics ({topics.length})</h3>
        {topics.length === 0 ? (
          <div className="sa-card p-6 text-center text-xs" style={{ color: "var(--muted)" }}>
            No topics extracted yet for this document.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {topics.map((t, idx) => {
              const masteryVal = 65 + ((idx * 11) % 30);
              return (
                <div key={t.id || idx} className="sa-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium truncate max-w-[170px]">{t.name}</span>
                    <span className="text-xs font-semibold text-amber-500">{masteryVal}%</span>
                  </div>
                  <ProgressBar value={masteryVal} tone={masteryVal >= 70 ? "success" : "accent"} height={6} />
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-3">AI Study Actions</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="sa-card sa-card-lg p-5">
            <HelpCircle size={20} color="var(--accent)" className="mb-3" />
            <div className="font-semibold text-sm mb-1">Create Adaptive Quiz</div>
            <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>Generate diagnostic questions directly from this document.</p>
            <button onClick={() => go("quiz-setup")} className="sa-btn-primary w-full text-xs py-2 font-medium">Create Quiz</button>
          </div>
          <div className="sa-card sa-card-lg p-5">
            <BookOpen size={20} color="var(--accent)" className="mb-3" />
            <div className="font-semibold text-sm mb-1">Topic-wise Summary</div>
            <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>Review structured summaries from this document.</p>
            <button onClick={() => go("summary")} className="sa-btn-primary w-full text-xs py-2 font-medium">Create Summary</button>
          </div>
          <div className="sa-card sa-card-lg p-5">
            <MessageSquare size={20} color="var(--accent)" className="mb-3" />
            <div className="font-semibold text-sm mb-1">Ask AI Vault</div>
            <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>Ask questions and clear doubts from your notes.</p>
            <button onClick={() => go("chat")} className="sa-btn-primary w-full text-xs py-2 font-medium">Open Chat</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
