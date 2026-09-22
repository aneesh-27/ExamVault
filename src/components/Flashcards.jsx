import React, { useState, useEffect } from "react";
import { Check, RotateCcw, ArrowLeft, ArrowRight } from "lucide-react";
import { Badge, ProgressBar } from "./UI";
import { getTopicFlashcards } from "../services/api";

function Flashcards({ topic, accessToken, showToast }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFlashcards() {
      if (!topic?.id) return;
      setLoading(true);
      try {
        const res = await getTopicFlashcards(topic.id, accessToken);
        setFlashcards(res.flashcards || []);
        setIndex(0);
        setFlipped(false);
      } catch (err) {
        showToast(err.message || "Failed to load flashcards");
      } finally {
        setLoading(false);
      }
    }
    loadFlashcards();
  }, [topic, accessToken, showToast]);

  if (loading) {
    return <div className="text-sm" style={{ color: "var(--muted)" }}>Loading flashcards...</div>;
  }

  if (flashcards.length === 0) {
    return <div className="text-sm" style={{ color: "var(--muted)" }}>No flashcards generated for this topic.</div>;
  }

  const card = flashcards[index % flashcards.length];
  const next = () => { setFlipped(false); setTimeout(() => setIndex((i) => (i + 1) % flashcards.length), 150); };
  const prev = () => { setFlipped(false); setTimeout(() => setIndex((i) => (i - 1 + flashcards.length) % flashcards.length), 150); };

  return (
    <div className="sa-fade-in max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="sa-serif text-2xl font-semibold">{topic.name}</h2>
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
        <button onClick={() => { setKnown(known + 1); showToast("Marked as known"); next(); }} className="sa-btn-primary py-2.5 text-sm font-medium flex items-center justify-center gap-2">
          <Check size={15} /> I Know
        </button>
        <button onClick={() => { showToast("Added to review pile"); next(); }} className="sa-btn-outline py-2.5 text-sm font-medium flex items-center justify-center gap-2">
          <RotateCcw size={15} /> Review Again
        </button>
      </div>
    </div>
  );
}

export default Flashcards;
