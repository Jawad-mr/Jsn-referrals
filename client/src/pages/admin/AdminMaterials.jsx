import { useEffect, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import api from "../../lib/api";
import { Spinner } from "../../components/ui";

export default function AdminMaterials() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  function load() {
    setLoading(true);
    api.get("/materials").then((res) => setMaterials(res.data.materials)).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleDelete(id) {
    await api.delete(`/materials/${id}`);
    load();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold sm:text-3xl">Materials</h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">Manage the banners and captions referrers can share.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 rounded-full bg-[var(--color-yellow)] px-5 py-2.5 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-amber)]"
        >
          <Plus size={15} /> Add material
        </button>
      </div>

      {loading ? (
        <div className="flex h-48 items-center justify-center"><Spinner className="h-6 w-6 text-[var(--color-text-muted)]" /></div>
      ) : (
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {materials.map((m) => (
            <div key={m._id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="flex items-start justify-between">
                <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[var(--color-border)] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
                  {m.type}
                </span>
                <button onClick={() => handleDelete(m._id)} aria-label="Delete" className="text-[var(--color-text-faint)] hover:text-[var(--color-danger)]">
                  <Trash2 size={14} />
                </button>
              </div>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-sm font-semibold">{m.title}</h3>
              {m.captionText && <p className="mt-1.5 line-clamp-3 text-xs text-[var(--color-text-muted)]">{m.captionText}</p>}
            </div>
          ))}
        </div>
      )}

      {showForm && <MaterialForm onClose={() => setShowForm(false)} onSaved={() => { setShowForm(false); load(); }} />}
    </div>
  );
}

function MaterialForm({ onClose, onSaved }) {
  const [form, setForm] = useState({ title: "", type: "caption", captionText: "", fileUrl: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await api.post("/materials", form);
      onSaved();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save material.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">Add material</h3>
          <button onClick={onClose} aria-label="Close"><X size={18} className="text-[var(--color-text-muted)]" /></button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)]">Title</span>
            <input required value={form.title} onChange={(e) => update("title", e.target.value)} className="modal-field" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)]">Type</span>
            <select value={form.type} onChange={(e) => update("type", e.target.value)} className="modal-field">
              <option value="caption">Caption</option>
              <option value="banner">Banner</option>
              <option value="story">Story</option>
              <option value="video">Video</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)]">Image/video URL (optional)</span>
            <input value={form.fileUrl} onChange={(e) => update("fileUrl", e.target.value)} className="modal-field" placeholder="https://..." />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)]">Caption text</span>
            <textarea value={form.captionText} onChange={(e) => update("captionText", e.target.value)} className="modal-field min-h-[100px] resize-y" />
          </label>

          {error && <p className="text-sm text-[var(--color-danger)]">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-yellow)] py-2.5 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-amber)] disabled:opacity-60"
          >
            {saving ? <Spinner /> : "Save material"}
          </button>
        </form>

        <style>{`
          .modal-field {
            width: 100%;
            border-radius: 0.65rem;
            border: 1px solid var(--color-border);
            background-color: var(--color-ink);
            padding: 0.6rem 0.85rem;
            font-size: 0.875rem;
            color: var(--color-text);
          }
          .modal-field:focus { outline: none; border-color: var(--color-yellow); }
        `}</style>
      </div>
    </div>
  );
}
