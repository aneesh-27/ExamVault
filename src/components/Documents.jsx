import React, { useState } from "react";
import { Upload, Search, FileText, Trash2, AlertCircle } from "lucide-react";
import { Badge, ProgressBar, EmptyState } from "./UI";
import { DOCUMENTS } from "../data/mockData";

function Documents({ go, showToast, selectDoc }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [docs, setDocs] = useState(DOCUMENTS);

  const filtered = docs.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterType === "All" || d.type === filterType)
  );

  return (
    <div className="sa-fade-in space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="sa-serif text-2xl font-semibold">My Documents</h2>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>{docs.length} documents · manage and study your uploaded material</p>
        </div>
        <button onClick={() => go("upload")} className="sa-btn-accent px-4 py-2.5 text-sm flex items-center gap-2 self-start">
          <Upload size={15} /> Upload New
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg flex-1 border" style={{ background: "var(--input-bg)", borderColor: "var(--line)" }}>
          <Search size={15} color="var(--muted)" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search your documents..." className="bg-transparent text-sm outline-none w-full" style={{ color: "var(--text)" }} />
        </div>
        <div className="flex items-center gap-1 sa-card px-1 py-1">
          {["All", "PDF", "PPTX"].map((t) => (
            <button key={t} onClick={() => setFilterType(t)}
              className="px-3 py-1.5 text-xs font-medium rounded-md transition-colors"
              style={{ background: filterType === t ? "var(--ink-btn)" : "transparent", color: filterType === t ? "var(--ink-btn-text)" : "var(--text)" }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={FileText} title="No documents found" description="Try a different search term or upload new study material."
          action={<button onClick={() => go("upload")} className="sa-btn-accent px-4 py-2 text-sm">Upload Study Material</button>} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((d) => (
            <div key={d.id} className="sa-card p-4 flex flex-col relative">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-2 min-w-0">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "var(--chip-bg)" }}>
                    <FileText size={16} color="var(--accent)" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{d.name}</div>
                    <div className="text-xs" style={{ color: "var(--muted)" }}>{d.type} · {d.pages} pages</div>
                  </div>
                </div>
                <button onClick={() => setConfirmDelete(d.id)} className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 flex-shrink-0" title="Delete document">
                  <Trash2 size={14} color="var(--muted)" />
                </button>
              </div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <Badge tone="info">{d.topicsDetected} topics</Badge>
                <span className="text-xs" style={{ color: "var(--muted)" }}>Uploaded {d.uploadedAt}</span>
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span style={{ color: "var(--muted)" }}>Progress</span>
                  <span className="font-medium">{d.progress}%</span>
                </div>
                <ProgressBar value={d.progress} tone={d.progress > 60 ? "success" : "accent"} height={6} />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-auto">
                <button onClick={() => { selectDoc(d); go("analysis"); }} className="sa-btn-primary text-xs py-2 font-medium">Study</button>
                <button onClick={() => go("chat")} className="sa-btn-outline text-xs py-2 font-medium">Chat</button>
                <button onClick={() => go("quiz-setup")} className="sa-btn-outline text-xs py-2 font-medium">Quiz</button>
                <button onClick={() => go("summary")} className="sa-btn-outline text-xs py-2 font-medium">Summary</button>
              </div>

              {confirmDelete === d.id && (
                <div className="absolute inset-0 rounded-[14px] flex flex-col items-center justify-center gap-3 p-4 text-center z-10" style={{ background: "var(--surface)", border: "1px solid var(--line)" }}>
                  <AlertCircle size={20} color="var(--danger)" />
                  <p className="text-sm font-medium">Delete "{d.name}"?</p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>This can't be undone.</p>
                  <div className="flex gap-2">
                    <button onClick={() => setConfirmDelete(null)} className="sa-btn-outline text-xs px-3 py-1.5">Cancel</button>
                    <button onClick={() => { setDocs(docs.filter((x) => x.id !== d.id)); setConfirmDelete(null); showToast("Document deleted"); }}
                      className="text-xs px-3 py-1.5 rounded-lg font-medium text-white" style={{ background: "var(--danger)" }}>Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Documents;
