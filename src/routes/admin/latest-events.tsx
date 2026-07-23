import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { isLoggedIn, loadLatestEventsData, saveLatestEventsData, getAssetOptions, type AdminEventData } from "@/services/adminService";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Plus, Pencil, Trash2, Save, Check, X } from "lucide-react";

export const Route = createFileRoute("/admin/latest-events")({
  component: AdminLatestEventsPage,
});

type AssetOption = { path: string; url: string; label: string };

function AdminLatestEventsPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<AdminEventData[]>(() => loadLatestEventsData());
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [assets, setAssets] = useState<AssetOption[]>([]);
  const [editing, setEditing] = useState<AdminEventData | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) { navigate({ to: "/admin/login" }); }
    else { setAuthed(true); }
  }, [navigate]);

  useEffect(() => {
    getAssetOptions("events").then(setAssets);
  }, []);

  if (!authed) return null;

  const handleSave = async () => {
    setSaving(true);
    await saveLatestEventsData(events);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addItem = () => {
    setEditing({ title: "", date: "Jan 01", tag: "Meetup", desc: "", img: assets[0]?.url ?? "" });
    setShowForm(true);
  };

  const editItem = (item: AdminEventData) => {
    setEditing({ ...item });
    setShowForm(true);
  };

  const deleteItem = (i: number) => {
    setEvents((prev) => prev.filter((_, idx) => idx !== i));
  };

  const saveItem = () => {
    if (!editing) return;
    setEvents((prev) => {
      const idx = prev.findIndex((e) => e.title === editing.title);
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
          <h1 className="text-xl font-bold text-slate-900">Latest Events</h1>
          <button onClick={handleSave} disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-50 transition-colors">
            {saved ? <><Check size={16} /> Saved</> : <><Save size={16} /> {saving ? "Saving..." : "Save All"}</>}
          </button>
        </div>

        <div className="p-8 space-y-6 max-w-4xl">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">{events.length} event{events.length !== 1 ? "s" : ""}</p>
            <button onClick={addItem}
              className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-orange-700 transition-colors">
              <Plus size={16} /> Add Event
            </button>
          </div>

          {events.length === 0 ? (
            <p className="text-sm text-slate-400 py-12 text-center">No events yet.</p>
          ) : (
            <div className="space-y-3">
              {events.map((event, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 group hover:border-slate-300 transition-colors shadow-sm">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-slate-200">
                    {event.img && <img src={event.img} alt="" className="h-full w-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">{event.title}</p>
                    <p className="text-xs text-slate-500">{event.date} · {event.tag}</p>
                    <p className="text-xs text-slate-400 truncate">{event.desc}</p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => editItem(event)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700">
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
              <h3 className="text-lg font-semibold text-slate-900">{events.find((e) => e.title === editing.title) ? "Edit" : "Add"} Event</h3>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input type="text" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" placeholder="Event Title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                  <input type="text" value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" placeholder="Jan 12" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tag</label>
                  <input type="text" value={editing.tag} onChange={(e) => setEditing({ ...editing, tag: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" placeholder="Meetup" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea value={editing.desc} onChange={(e) => setEditing({ ...editing, desc: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" rows={3} placeholder="Event description" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Image</label>
                <select value={editing.img} onChange={(e) => setEditing({ ...editing, img: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none">
                  {assets.map((a) => <option key={a.path} value={a.url}>{a.label}</option>)}
                </select>
                {editing.img && <img src={editing.img} alt="" className="mt-2 h-20 w-32 rounded-lg object-cover border border-slate-200" />}
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => { setShowForm(false); setEditing(null); }}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
              <button onClick={saveItem} disabled={!editing.title}
                className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-50">
                {events.find((e) => e.title === editing.title) ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
