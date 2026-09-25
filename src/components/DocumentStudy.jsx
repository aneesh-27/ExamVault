import React, { useState, useEffect } from "react";
import { ArrowLeft, BookOpen, FileText, Upload } from "lucide-react";
import { getDocumentTopics, getDocuments } from "../services/api";
import Flashcards from "./Flashcards";
import { Badge, EmptyState } from "./UI";

function DocumentStudy({ go, doc, selectDoc, accessToken, showToast }) {
  const [activeDoc, setActiveDoc] = useState(doc);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [docsList, setDocsList] = useState([]);

  // If no document passed, fetch user's documents from Neon
  useEffect(() => {
    async function initDocs() {
      if (!activeDoc && accessToken) {
        setLoading(true);
        try {
          const res = await getDocuments(accessToken);
          const docs = res.documents || [];
          setDocsList(docs);
          if (docs.length > 0) {
            const firstCompleted = docs.find((d) => d.status === "completed") || docs[0];
            setActiveDoc(firstCompleted);
            if (selectDoc) selectDoc(firstCompleted);
          }
        } catch (err) {
          console.warn("Could not load documents for study:", err);
        } finally {
          setLoading(false);
        }
      } else if (activeDoc) {
        setLoading(false);
      }
    }
    initDocs();
  }, [activeDoc, accessToken, selectDoc]);

  // Load topics for the active document
  useEffect(() => {
    async function loadTopics() {
      if (!activeDoc?.id) return;
      setLoading(true);
      try {
        const res = await getDocumentTopics(activeDoc.id, accessToken);
        setTopics(res.topics || []);
        if (res.topics?.length > 0) {
          setSelectedTopic(res.topics[0]);
        } else {
          setSelectedTopic(null);
        }
      } catch (err) {
        if (showToast) showToast(err.message || "Failed to load topics");
      } finally {
        setLoading(false);
      }
    }
    if (activeDoc?.id) {
      loadTopics();
    }
  }, [activeDoc, accessToken, showToast]);

  if (!activeDoc && !loading) {
    return (
      <div className="sa-fade-in max-w-xl mx-auto py-12">
        <EmptyState
          icon={FileText}
          title="No Study Document Selected"
          description="Upload course materials or notes to generate topics, summaries, and flashcards."
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
    <div className="sa-fade-in flex flex-col md:flex-row gap-6">
      {/* Sidebar for Topics */}
      <div className="w-full md:w-64 flex flex-col gap-4">
        <button onClick={() => go("documents")} className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: "var(--text)" }}>
          <ArrowLeft size={16} /> Back to Documents
        </button>

        <div className="sa-card p-4">
          <div className="mb-4">
            <h3 className="sa-serif font-semibold text-base truncate" title={activeDoc?.filename || activeDoc?.name}>
              {activeDoc?.filename || activeDoc?.name}
            </h3>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
              {activeDoc?.status === "completed" ? "Generated Topics" : activeDoc?.status || "Processing..."}
            </p>
          </div>
          
          {loading ? (
            <div className="text-sm" style={{ color: "var(--muted)" }}>Loading topics from Neon...</div>
          ) : topics.length === 0 ? (
            <div className="text-sm space-y-2" style={{ color: "var(--muted)" }}>
              <p>No topics generated yet.</p>
              {activeDoc?.status !== "completed" && (
                <p className="text-xs text-amber-500">Document is currently being analyzed with Ollama.</p>
              )}
            </div>
          ) : (
            <div className="space-y-1 max-h-[60vh] overflow-y-auto sa-scroll pr-1">
              {topics.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTopic(t)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between group`}
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
            go={go}
          />
        ) : (
          <div className="sa-card p-12 text-center flex flex-col items-center justify-center">
             <BookOpen size={32} color="var(--muted)" className="mb-4" />
             <h4 className="font-semibold text-sm mb-1">Select a Topic to Revise</h4>
             <p className="text-xs" style={{ color: "var(--muted)" }}>
               Choose any topic from the sidebar to start active recall flashcards.
             </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DocumentStudy;
