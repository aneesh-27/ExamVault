import React, { useState, useEffect } from "react";
import { Upload, Search, FileText, Trash2, AlertCircle } from "lucide-react";
import { Badge, ProgressBar, EmptyState } from "./UI";
import { getDocuments } from "../services/api";

function Documents({ go, showToast, selectDoc, accessToken }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await getDocuments(accessToken);
        setDocs(res.documents || []);
      } catch (err) {
        showToast(err.message || "Failed to load documents.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [accessToken, showToast]);

  useEffect(() => {
    const hasProcessing = docs.some(d => d.status && d.status.toLowerCase().includes("processing"));
    if (!hasProcessing) return;

    const interval = setInterval(async () => {
      try {
        const res = await getDocuments(accessToken);
        setDocs(res.documents || []);
      } catch (e) {
        console.error("Failed to poll documents", e);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [docs, accessToken]);

  const filtered = docs.filter((d) =>
    (d.filename || d.name || "").toLowerCase().includes(search.toLowerCase()) &&
    (filterType === "All" || (d.mime_type && d.mime_type.includes(filterType.toLowerCase())))
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
          {["All", "PDF", "DOCX"].map((t) => (
            <button key={t} onClick={() => setFilterType(t)}
              className="px-3 py-1.5 text-xs font-medium rounded-md transition-colors"
              style={{ background: filterType === t ? "var(--ink-btn)" : "transparent", color: filterType === t ? "var(--ink-btn-text)" : "var(--text)" }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-sm" style={{ color: "var(--muted)" }}>Loading documents...</div>
      ) : filtered.length === 0 ? (
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
                    <div className="text-sm font-medium truncate">{d.filename || d.name}</div>
                    <div className="text-xs" style={{ color: "var(--muted)" }}>{(d.file_size / 1024 / 1024).toFixed(2)} MB</div>
                  </div>
                </div>
                <button onClick={() => setConfirmDelete(d.id)} className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 flex-shrink-0" title="Delete document">
                  <Trash2 size={14} color="var(--muted)" />
                </button>
              </div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <Badge tone={d.status === "completed" ? "success" : "info"}>{d.status}</Badge>
                <span className="text-xs" style={{ color: "var(--muted)" }}>{new Date(d.created_at).toLocaleDateString()}</span>
              </div>
              
              <div className="grid grid-cols-1 gap-2 mt-auto">
                <button 
                  onClick={() => { selectDoc(d); go("document-study"); }} 
                  disabled={d.status !== "completed"}
                  className="sa-btn-primary text-xs py-2 font-medium"
                  style={{ opacity: d.status !== "completed" ? 0.5 : 1 }}
                >
                  {d.status === "completed" ? "Study Topics" : d.status}
                </button>
              </div>

              {confirmDelete === d.id && (
                <div className="absolute inset-0 rounded-[14px] flex flex-col items-center justify-center gap-3 p-4 text-center z-10" style={{ background: "var(--surface)", border: "1px solid var(--line)" }}>
                  <AlertCircle size={20} color="var(--danger)" />
                  <p className="text-sm font-medium">Delete "{d.filename}"?</p>
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
