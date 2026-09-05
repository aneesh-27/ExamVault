import React, { useState } from "react";
import { Check, RotateCcw, ArrowLeft, ArrowRight } from "lucide-react";
import { Badge, ProgressBar } from "./UI";
import { FLASHCARDS } from "../data/mockData";

function Flashcards({ showToast }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);

  const card = FLASHCARDS[index % FLASHCARDS.length];
  const next = () => { setFlipped(false); setTimeout(() => setIndex((i) => (i + 1) % FLASHCARDS.length), 150); };
  const prev = () => { setFlipped(false); setTimeout(() => setIndex((i) => (i - 1 + FLASHCARDS.length) % FLASHCARDS.length), 150); };

  return (
    <div className="sa-fade-in max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="sa-serif text-2xl font-semibold">Flashcards</h2>
        <Badge tone="info">{index + 1} / {FLASHCARDS.length} cards</Badge>
      </div>
      <ProgressBar value={((index + 1) / FLASHCARDS.length) * 100} tone="accent" height={6} />

      <div className="sa-flip-card mt-6" style={{ height: 280 }}>
        <div className={`sa-flip-inner ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
          <div className="sa-flip-face sa-card sa-card-lg p-8 cursor-pointer" style={{ background: "var(--ink)" }}>
            <div className="text-center">
              <Badge tone="accent">{card.topic}</Badge>
              <p className="sa-serif text-white text-xl font-medium mt-5 leading-relaxed">{card.q}</p>
              <p className="text-xs mt-6" style={{ color: "#9BA4BE" }}>Tap to reveal answer</p>
            </div>
          </div>
          <div className="sa-flip-face sa-flip-back sa-card sa-card-lg p-8 cursor-pointer">
            <div className="text-center">
              <Badge tone="success">Answer</Badge>
              <p className="text-sm mt-5 leading-relaxed">{card.a}</p>
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
