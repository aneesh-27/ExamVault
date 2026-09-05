import React, { useState, useEffect, useRef } from "react";
import { FileUp, FileText, CheckCircle2, Circle } from "lucide-react";
import { ProgressBar } from "./UI";

function UploadPage({ go, showToast }) {
  const [stage, setStage] = useState("idle"); // idle, processing, done
  const [stepIndex, setStepIndex] = useState(0);
  const steps = ["Uploading file", "Reading document", "Detecting topics", "Preparing AI tools", "Ready"];
  const fileInputRef = useRef(null);

  const startProcessing = () => {
    setStage("processing");
    setStepIndex(0);
  };

  useEffect(() => {
    if (stage !== "processing") return;
    if (stepIndex >= steps.length - 1) {
      const t = setTimeout(() => setStage("done"), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStepIndex((i) => i + 1), 700);
    return () => clearTimeout(t);
  }, [stage, stepIndex]);

  return (
    <div className="sa-fade-in max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="sa-serif text-2xl font-semibold">Upload your study material</h2>
        <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>Upload PDFs, documents, presentations or notes and let AI analyze them.</p>
      </div>

      {stage === "idle" && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="sa-card sa-card-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer"
          style={{ borderStyle: "dashed", borderWidth: 2, borderColor: "#CFCBBB" }}
        >
          <input ref={fileInputRef} type="file" className="hidden" onChange={startProcessing} />
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: "var(--accent-soft)" }}>
            <FileUp size={22} color="var(--accent-ink)" />
          </div>
          <p className="font-medium mb-1">Drag & drop your files here</p>
          <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>or</p>
          <button onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }} className="sa-btn-primary px-5 py-2.5 text-sm font-medium">Browse Files</button>
          <p className="text-xs mt-6" style={{ color: "var(--muted)" }}>Supported formats: PDF, DOCX, PPTX, TXT, JPG, PNG</p>
        </div>
      )}

      {stage === "processing" && (
        <div className="sa-card sa-card-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "#EFEDE6" }}>
              <FileText size={18} color="var(--ink)" />
            </div>
            <div>
              <div className="text-sm font-medium">Computer_Networks_Notes.pdf</div>
              <div className="text-xs" style={{ color: "var(--muted)" }}>2.4 MB</div>
            </div>
          </div>
          <div className="space-y-3">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                {i < stepIndex ? <CheckCircle2 size={17} color="var(--success)" /> :
                  i === stepIndex ? <div className="w-4 h-4 rounded-full border-2 flex-shrink-0" style={{ borderColor: "var(--accent)", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} /> :
                    <Circle size={16} color="#D8D5C9" />}
                <span className={`text-sm ${i <= stepIndex ? "font-medium" : ""}`} style={{ color: i <= stepIndex ? "var(--text)" : "var(--muted)" }}>{s}</span>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <ProgressBar value={((stepIndex + 1) / steps.length) * 100} tone="accent" height={6} />
          </div>
        </div>
      )}

      {stage === "done" && (
        <div className="sa-card sa-card-lg p-8 text-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "var(--success-soft)" }}>
            <CheckCircle2 size={24} color="var(--success)" />
          </div>
          <h3 className="sa-serif text-xl font-semibold mb-2">Analysis complete</h3>
          <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>We detected 6 topics across 86 pages, ready for quizzes, summaries and chat.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => go("analysis")} className="sa-btn-accent px-5 py-2.5 text-sm">View Analysis</button>
            <button onClick={() => go("documents")} className="sa-btn-outline px-5 py-2.5 text-sm font-medium">Back to Documents</button>
          </div>
        </div>
      )}
    </div>
  );
}


export default UploadPage;
