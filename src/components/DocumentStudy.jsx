import React, { useState, useEffect } from "react";
import { ArrowLeft, BookOpen, Layers } from "lucide-react";
import { getDocumentTopics } from "../services/api";
import Flashcards from "./Flashcards";
import { Badge } from "./UI";

function DocumentStudy({ go, doc, accessToken, showToast }) {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTopics() {
      if (!doc?.id) return;
      try {
        const res = await getDocumentTopics(doc.id, accessToken);
        setTopics(res.topics || []);
        if (res.topics?.length > 0) {
          setSelectedTopic(res.topics[0]);
        }
      } catch (err) {
        showToast(err.message || "Failed to load topics");
      } finally {
        setLoading(false);
      }
    }
    loadTopics();
  }, [doc, accessToken, showToast]);

  if (!doc) {
    return <div>No document selected.</div>;
  }

  return (
    <div className="sa-fade-in flex flex-col md:flex-row gap-6">
      {/* Sidebar for Topics */}
      <div className="w-full md:w-64 flex flex-col gap-4">
        <button onClick={() => go("documents")} className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: "var(--text)" }}>
          <ArrowLeft size={16} /> Back to Documents
        </button>

        <div className="sa-card p-4">
          <div className="mb-4">
            <h3 className="sa-serif font-semibold text-lg truncate" title={doc.filename}>{doc.filename}</h3>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Generated Topics</p>
          </div>
          
          {loading ? (
            <div className="text-sm" style={{ color: "var(--muted)" }}>Loading topics...</div>
          ) : topics.length === 0 ? (
            <div className="text-sm" style={{ color: "var(--muted)" }}>No topics found.</div>
          ) : (
            <div className="space-y-1">
              {topics.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTopic(t)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between group`}
                  style={{ 
                    background: selectedTopic?.id === t.id ? "var(--ink-btn)" : "transparent",
                    color: selectedTopic?.id === t.id ? "var(--ink-btn-text)" : "var(--text)" 
                  }}
                >
                  <span className="truncate">{t.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Study Area */}
      <div className="flex-1">
        {selectedTopic ? (
          <Flashcards 
            topic={selectedTopic} 
            accessToken={accessToken} 
            showToast={showToast} 
          />
        ) : (
          <div className="sa-card p-12 text-center flex flex-col items-center justify-center">
             <BookOpen size={32} color="var(--muted)" className="mb-4" />
             <p className="text-sm" style={{ color: "var(--muted)" }}>Select a topic from the sidebar to begin revising.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DocumentStudy;
