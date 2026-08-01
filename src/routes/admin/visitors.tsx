import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { isLoggedIn, loadVisitorsData, saveVisitorsData, getMultiCategoryAssetOptions, type AdminVisitorData } from "@/services/adminService";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Plus, Pencil, Trash2, Save, Check, X } from "lucide-react";

export const Route = createFileRoute("/admin/visitors")({
  component: AdminVisitorsPage,
});

type AssetOption = { path: string; url: string; label: string };

function AdminVisitorsPage() {
  const navigate = useNavigate();
  const [visitors, setVisitors] = useState<AdminVisitorData[]>(() => loadVisitorsData());
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [assets, setAssets] = useState<AssetOption[]>([]);
  const [editing, setEditing] = useState<AdminVisitorData | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) { navigate({ to: "/admin/login" }); }
    else { setAuthed(true); }
  }, [navigate]);

  useEffect(() => {
    getMultiCategoryAssetOptions(["visitors", "testimonals"]).then(setAssets);
  }, []);

  if (!authed) return null;

  const handleSave = async () => {
    setSaving(true);
    await saveVisitorsData(visitors);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addItem = () => {
    setEditing({ name: "", role: "", org: "", image: assets[0]?.url ?? "" });
    setShowForm(true);
  };

  const editItem = (item: AdminVisitorData) => {
    setEditing({ ...item });
    setShowForm(true);
  };

  const deleteItem = (i: number) => {
    setVisitors((prev) => prev.filter((_, idx) => idx !== i));
  };

  const saveItem = () => {
    if (!editing) return;
    setVisitors((prev) => {
      const idx = prev.findIndex((v) => v.name === editing.name);
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
          <h1 className="text-xl font-bold text-slate-900">Our Distinguished Visitors</h1>
          <button onClick={handleSave} disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-50 transition-colors">
            {saved ? <><Check size={16} /> Saved</> : <><Save size={16} /> {saving ? "Saving..." : "Save All"}</>}
          </button>
        </div>

        <div className="p-8 space-y-6 max-w-4xl">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">{visitors.length} visitor{visitors.length !== 1 ? "s" : ""}</p>
            <button onClick={addItem}
              className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-orange-700 transition-colors">
              <Plus size={16} /> Add Visitor
            </button>
          </div>

          {visitors.length === 0 ? (
            <p className="text-sm text-slate-400 py-12 text-center">No visitors yet.</p>
          ) : (
            <div className="space-y-3">
              {visitors.map((v, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 group hover:border-slate-300 transition-colors shadow-sm">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-slate-200">
                    {v.image && <img src={v.image} alt="" className="h-full w-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">{v.name}</p>
                    <p className="text-xs text-slate-500">{v.role}</p>
                    <p className="text-xs text-slate-400">{v.org}</p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => editItem(v)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700">
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
              <h3 className="text-lg font-semibold text-slate-900">{visitors.find((v) => v.name === editing.name) ? "Edit" : "Add"} Visitor</h3>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input type="text" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" placeholder="Visitor Name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                  <input type="text" value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" placeholder="Executive Chairman" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Organization</label>
                  <input type="text" value={editing.org} onChange={(e) => setEditing({ ...editing, org: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" placeholder="Tata Sons" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Photo</label>
                <select value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none">
                  {assets.map((a) => <option key={a.path} value={a.url}>{a.label}</option>)}
                </select>
                {editing.image && <img src={editing.image} alt="" className="mt-2 h-16 w-16 rounded-full object-cover border border-slate-200" />}
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => { setShowForm(false); setEditing(null); }}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
              <button onClick={saveItem} disabled={!editing.name}
                className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-50">
                {visitors.find((v) => v.name === editing.name) ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
