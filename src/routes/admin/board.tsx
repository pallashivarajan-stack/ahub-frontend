import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { isLoggedIn, loadBoardData, saveBoardData, getBoardAssetOptions } from "@/services/adminService";
import type { BoardMember } from "@/data/boardPage";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Plus, Pencil, Trash2, Save, Check, X } from "lucide-react";

export const Route = createFileRoute("/admin/board")({
  component: AdminBoardPage,
});

type AssetOption = { path: string; url: string; label: string };

function AdminBoardPage() {
  const navigate = useNavigate();
  const [members, setMembers] = useState<BoardMember[]>(() => loadBoardData());
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [assets, setAssets] = useState<AssetOption[]>([]);
  const [editing, setEditing] = useState<BoardMember | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) { navigate({ to: "/admin/login" }); }
    else { setAuthed(true); }
  }, [navigate]);

  useEffect(() => {
    getBoardAssetOptions().then(setAssets);
  }, []);

  if (!authed) return null;

  const handleSave = async () => {
    setSaving(true);
    await saveBoardData(members);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addMember = () => {
    setEditing({ name: "", title: "", bio: "", image: assets[0]?.url ?? "", linkedIn: "" });
    setShowForm(true);
  };

  const editMember = (m: BoardMember) => {
    setEditing({ ...m });
    setShowForm(true);
  };

  const deleteMember = (i: number) => {
    setMembers((prev) => prev.filter((_, idx) => idx !== i));
  };

  const saveMember = () => {
    if (!editing) return;
    setMembers((prev) => {
      const idx = prev.findIndex((m) => m.name === editing.name);
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
          <h1 className="text-xl font-bold text-slate-900">Board Members</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-50 transition-colors"
          >
            {saved ? <><Check size={16} /> Saved</> : <><Save size={16} /> {saving ? "Saving..." : "Save All"}</>}
          </button>
        </div>

        <div className="p-8 space-y-6 max-w-4xl">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">{members.length} board member{members.length !== 1 ? "s" : ""}</p>
            <button
              onClick={addMember}
              className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-orange-700 transition-colors"
            >
              <Plus size={16} /> Add Member
            </button>
          </div>

          {members.length === 0 ? (
            <p className="text-sm text-slate-400 py-12 text-center">No board members yet.</p>
          ) : (
            <div className="space-y-3">
              {members.map((member, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 group hover:border-slate-300 transition-colors shadow-sm">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-slate-200">
                    {member.image && <img src={member.image} alt="" className="h-full w-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">{member.name}</p>
                    <p className="text-xs text-slate-500">{member.title}</p>
                    {member.bio && <p className="mt-1 text-xs text-slate-400 line-clamp-1">{member.bio}</p>}
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => editMember(member)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => deleteMember(i)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-100 hover:text-red-600">
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
              <h3 className="text-lg font-semibold text-slate-900">{members.find((m) => m.name === editing.name) ? "Edit" : "Add"} Board Member</h3>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input type="text" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" placeholder="Prof. Name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input type="text" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" placeholder="Vice Chancellor" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Photo</label>
                <select value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none">
                  {assets.map((a) => <option key={a.path} value={a.url}>{a.label}</option>)}
                </select>
                {editing.image && <img src={editing.image} alt="" className="mt-2 h-16 w-16 rounded-full object-cover border border-slate-200" />}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                <textarea value={editing.bio} onChange={(e) => setEditing({ ...editing, bio: e.target.value })} rows={3}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" placeholder="Short biography" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn URL</label>
                <input type="url" value={editing.linkedIn ?? ""} onChange={(e) => setEditing({ ...editing, linkedIn: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" placeholder="https://linkedin.com/in/..." />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => { setShowForm(false); setEditing(null); }}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
              <button onClick={saveMember} disabled={!editing.name}
                className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-50">
                {members.find((m) => m.name === editing.name) ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
