import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { isLoggedIn, loadSocialLinksData, saveSocialLinksData, type AdminSocialLinkData } from "@/services/adminService";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Plus, Pencil, Trash2, Save, Check, X } from "lucide-react";

export const Route = createFileRoute("/admin/find-us-on")({
  component: AdminFindUsOnPage,
});

const ICON_OPTIONS = ["Linkedin", "Twitter", "Instagram"];

function AdminFindUsOnPage() {
  const navigate = useNavigate();
  const [links, setLinks] = useState<AdminSocialLinkData[]>(() => loadSocialLinksData());
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState<AdminSocialLinkData | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) { navigate({ to: "/admin/login" }); }
    else { setAuthed(true); }
  }, [navigate]);

  if (!authed) return null;

  const handleSave = async () => {
    setSaving(true);
    await saveSocialLinksData(links);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addItem = () => {
    setEditing({
      name: "", username: "", description: "", href: "https://",
      iconName: "Linkedin",
      accent: "from-[#5b0e2d] via-[#8d1d46] to-[#f5d8e0]",
      glow: "bg-[#5b0e2d]/25",
    });
    setShowForm(true);
  };

  const editItem = (item: AdminSocialLinkData) => {
    setEditing({ ...item });
    setShowForm(true);
  };

  const deleteItem = (i: number) => {
    setLinks((prev) => prev.filter((_, idx) => idx !== i));
  };

  const saveItem = () => {
    if (!editing) return;
    setLinks((prev) => {
      const idx = prev.findIndex((l) => l.name === editing.name);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = editing;
        return updated;
      }
      return [...prev, editing];
    });
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="border-b border-slate-200 bg-white px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">Find Us On (Social Links)</h1>
          <button onClick={handleSave} disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-50 transition-colors">
            {saved ? <><Check size={16} /> Saved</> : <><Save size={16} /> {saving ? "Saving..." : "Save All"}</>}
          </button>
        </div>

        <div className="p-8 space-y-6 max-w-4xl">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">{links.length} social link{links.length !== 1 ? "s" : ""}</p>
            <button onClick={addItem}
              className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-orange-700 transition-colors">
              <Plus size={16} /> Add Social Link
            </button>
          </div>

          {links.length === 0 ? (
            <p className="text-sm text-slate-400 py-12 text-center">No social links yet.</p>
          ) : (
            <div className="space-y-3">
              {links.map((link, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 group hover:border-slate-300 transition-colors shadow-sm">
                  <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gradient-to-br from-[#5b0e2d] to-[#8d1d46] flex items-center justify-center text-white font-bold text-sm">
                    {link.name?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">{link.name}</p>
                    <p className="text-xs text-slate-500">{link.username}</p>
                    <p className="text-xs text-slate-400 truncate">{link.description}</p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => editItem(link)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => deleteItem(i)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-100 hover:text-red-600">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {showForm && editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => { if (confirm("Discard changes?")) { setShowForm(false); setEditing(null); } }}>
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl border border-slate-200 mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">{links.find((l) => l.name === editing.name) ? "Edit" : "Add"} Social Link</h3>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Platform Name</label>
                  <input type="text" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" placeholder="LinkedIn" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Display Username</label>
                  <input type="text" value={editing.username} onChange={(e) => setEditing({ ...editing, username: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" placeholder="A-Hub LinkedIn" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <input type="text" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" placeholder="Professional updates..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Profile URL</label>
                <input type="url" value={editing.href} onChange={(e) => setEditing({ ...editing, href: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" placeholder="https://www.linkedin.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Icon</label>
                <select value={editing.iconName} onChange={(e) => setEditing({ ...editing, iconName: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none">
                  {ICON_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Embed URL (optional)</label>
                <input type="url" value={editing.embed ?? ""} onChange={(e) => setEditing({ ...editing, embed: e.target.value || undefined })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" placeholder="LinkedIn embed URL" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tweet URL (optional)</label>
                <input type="url" value={editing.tweetUrl ?? ""} onChange={(e) => setEditing({ ...editing, tweetUrl: e.target.value || undefined })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" placeholder="https://twitter.com/..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Instagram Embed (optional)</label>
                <input type="url" value={editing.instagramEmbed ?? ""} onChange={(e) => setEditing({ ...editing, instagramEmbed: e.target.value || undefined })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" placeholder="https://www.instagram.com/p/..." />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => { setShowForm(false); setEditing(null); }}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
              <button onClick={saveItem} disabled={!editing.name}
                className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-50">
                {links.find((l) => l.name === editing.name) ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
