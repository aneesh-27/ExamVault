import React, { useState, useEffect } from "react";
import { Check, RotateCcw, ArrowLeft, ArrowRight, Layers, FileText, Upload } from "lucide-react";
import { Badge, ProgressBar, EmptyState } from "./UI";
import { getTopicFlashcards, getDocuments, getDocumentTopics } from "../services/api";

function Flashcards({ topic, accessToken, showToast, go, selectDoc }) {
  const [activeTopic, setActiveTopic] = useState(topic);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableTopics, setAvailableTopics] = useState([]);

  // If topic prop changes externally
  useEffect(() => {
    if (topic) {
      setActiveTopic(topic);
    }
  }, [topic]);

  // If no topic is passed, discover available topics from user's documents in Neon
  useEffect(() => {
    async function discoverTopics() {
      if (!activeTopic && accessToken) {
        setLoading(true);
        try {
          const docRes = await getDocuments(accessToken);
          const docs = docRes.documents || [];
          const completedDocs = docs.filter((d) => d.status === "completed");

          if (completedDocs.length > 0) {
            // Fetch topics from first completed doc
            const tRes = await getDocumentTopics(completedDocs[0].id, accessToken);
            const topList = tRes.topics || [];
            setAvailableTopics(topList);
            if (topList.length > 0) {
              setActiveTopic(topList[0]);
            } else {
              setLoading(false);
            }
          } else {
            setLoading(false);
          }
        } catch (err) {
          console.warn("Could not discover topics:", err);
          setLoading(false);
        }
      }
    }
    if (!activeTopic) {
      discoverTopics();
    }
  }, [activeTopic, accessToken]);

  // Load flashcards for activeTopic
  useEffect(() => {
    async function loadFlashcards() {
      if (!activeTopic?.id) return;
      setLoading(true);
      try {
        const res = await getTopicFlashcards(activeTopic.id, accessToken);
        setFlashcards(res.flashcards || []);
        setIndex(0);
        setFlipped(false);
      } catch (err) {
        if (showToast) showToast(err.message || "Failed to load flashcards");
      } finally {
        setLoading(false);
      }
    }
    if (activeTopic?.id) {
      loadFlashcards();
    }
  }, [activeTopic, accessToken, showToast]);

  if (loading) {
    return (
      <div className="sa-fade-in text-center py-12">
        <div className="text-sm" style={{ color: "var(--muted)" }}>Loading flashcards from Neon DB...</div>
      </div>
    );
  }

  if (!activeTopic || flashcards.length === 0) {
    return (
      <div className="sa-fade-in max-w-xl mx-auto py-8">
        <EmptyState
          icon={Layers}
          title="No Flashcards Found"
          description="Upload a study document to automatically generate AI-extracted revision flashcards with Ollama."
          action={
            <button onClick={() => go && go("upload")} className="sa-btn-accent px-5 py-2.5 text-xs font-semibold flex items-center gap-1.5">
              <Upload size={14} /> Upload Study Material
            </button>
          }
        />
      </div>
    );
  }

  const card = flashcards[index % flashcards.length];
  const next = () => { setFlipped(false); setTimeout(() => setIndex((i) => (i + 1) % flashcards.length), 150); };
  const prev = () => { setFlipped(false); setTimeout(() => setIndex((i) => (i - 1 + flashcards.length) % flashcards.length), 150); };

  return (
    <div className="sa-fade-in max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <h2 className="sa-serif text-2xl font-semibold">{activeTopic?.name}</h2>
          <span className="text-xs" style={{ color: "var(--muted)" }}>Interactive Spaced Repetition</span>
        </div>
        <Badge tone="info">{index + 1} / {flashcards.length} cards</Badge>
      </div>
      <ProgressBar value={((index + 1) / flashcards.length) * 100} tone="accent" height={6} />

      <div className="sa-flip-card mt-6" style={{ height: 280 }}>
        <div className={`sa-flip-inner ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
          <div className="sa-flip-face sa-card sa-card-lg p-8 cursor-pointer flex flex-col justify-center items-center" style={{ background: "var(--ink)" }}>
            <div className="text-center">
              <Badge tone="accent">Question</Badge>
              <p className="sa-serif text-white text-xl font-medium mt-5 leading-relaxed">{card.question}</p>
              <p className="text-xs mt-6" style={{ color: "#9BA4BE" }}>Tap to reveal answer</p>
            </div>
          </div>
          <div className="sa-flip-face sa-flip-back sa-card sa-card-lg p-8 cursor-pointer flex flex-col justify-center items-center">
            <div className="text-center overflow-y-auto w-full h-full custom-scrollbar">
              <Badge tone="success">Answer</Badge>
              <p className="text-sm mt-5 leading-relaxed">{card.answer}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <button onClick={prev} className="sa-btn-outline px-4 py-2 text-sm font-medium flex items-center gap-1.5"><ArrowLeft size={14} /> Previous</button>
        <button onClick={() => setFlipped(!flipped)} className="sa-btn-outline px-4 py-2 text-sm font-medium">Flip</button>
        <button onClick={next} className="sa-btn-outline px-4 py-2 text-sm font-medium flex items-center gap-1.5">Next <ArrowRight size={14} /></button>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <button onClick={() => { setKnown(known + 1); if (showToast) showToast("Marked as mastered"); next(); }} className="sa-btn-primary py-2.5 text-sm font-medium flex items-center justify-center gap-2">
          <Check size={15} /> I Know This
        </button>
        <button onClick={() => { if (showToast) showToast("Added to review pile"); next(); }} className="sa-btn-outline py-2.5 text-sm font-medium flex items-center justify-center gap-2">
          <RotateCcw size={15} /> Review Again
        </button>
      </div>
    </div>
  );
}

export default Flashcards;
