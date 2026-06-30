import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { isLoggedIn, loadTeamData, saveTeamData, getAssetOptions, type AdminTeamData } from "@/services/adminService";
import type { TeamMember } from "@/data/teamPage";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Plus, Pencil, Trash2, Save, Check, X } from "lucide-react";

export const Route = createFileRoute("/admin/team")({
  component: AdminTeamPage,
});

type AssetOption = { path: string; url: string; label: string };

function AdminTeamPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<AdminTeamData>(() => loadTeamData());
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [assets, setAssets] = useState<AssetOption[]>([]);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate({ to: "/admin/login" });
    } else {
      setAuthed(true);
    }
  }, [navigate]);

  useEffect(() => {
    getAssetOptions().then(setAssets);
  }, []);

  if (!authed) return null;

  const handleMetaChange = (field: keyof typeof data.meta, value: string) => {
    setData((prev) => ({ ...prev, meta: { ...prev.meta, [field]: value } }));
  };

  const handleSave = async () => {
    setSaving(true);
    await saveTeamData(data);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addMember = () => {
    setEditingMember({
      name: "",
      title: "",
      image: assets[0]?.url ?? "",
      tagline: "",
      visitLink: "",
    });
    setShowMemberForm(true);
  };

  const editMember = (member: TeamMember) => {
    setEditingMember({ ...member });
    setShowMemberForm(true);
  };

  const deleteMember = (index: number) => {
    setData((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
    }));
  };

  const saveMember = () => {
    if (!editingMember) return;
    setData((prev) => {
      const existing = prev.members.findIndex((m) => m.name === editingMember.name && m.title === editingMember.title);
      if (existing >= 0) {
        const updated = [...prev.members];
        updated[existing] = editingMember;
        return { ...prev, members: updated };
      }
      return { ...prev, members: [...prev.members, editingMember] };
    });
    setShowMemberForm(false);
    setEditingMember(null);
  };

  const memberFormDirty = editingMember && (
    editingMember.name ||
    editingMember.title ||
    editingMember.tagline ||
    editingMember.visitLink
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />

      <main className="flex-1 overflow-auto">
        <div className="border-b border-slate-200 bg-white px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">Team Page Editor</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-50 transition-colors"
          >
            {saved ? <><Check size={16} /> Saved</> : <><Save size={16} /> {saving ? "Saving..." : "Save All"}</>}
          </button>
        </div>

        <div className="p-8 space-y-8 max-w-4xl">
          {/* ── Group Photo Section ── */}
          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Group Photo Banner</h2>
            {assets.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Photo</label>
                <select
                  value={data.meta.groupPhoto}
                  onChange={(e) => handleMetaChange("groupPhoto", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                >
                  {assets.map((a) => (
                    <option key={a.path} value={a.url}>{a.label}</option>
                  ))}
                </select>
                {data.meta.groupPhoto && (
                  <img src={data.meta.groupPhoto} alt="Group photo preview" className="mt-3 h-40 w-full rounded-lg object-cover border border-slate-200" />
                )}
              </div>
            )}
          </section>

          {/* ── Metadata Section ── */}
          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Banner Text</h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  value={data.meta.title}
                  onChange={(e) => handleMetaChange("title", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="The A-Hub Family"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={data.meta.subtitle}
                  onChange={(e) => handleMetaChange("subtitle", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="14 Members · One Mission"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <input
                  type="text"
                  value={data.meta.description}
                  onChange={(e) => handleMetaChange("description", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="Building Andhra Pradesh's premier startup incubation ecosystem"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Member Count Label</label>
                <input
                  type="text"
                  value={data.meta.memberCountLabel}
                  onChange={(e) => handleMetaChange("memberCountLabel", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="Team Members"
                />
              </div>
            </div>
          </section>

          {/* ── Preview Card ── */}
          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Banner Preview</h2>
            <div className="relative h-48 overflow-hidden rounded-lg border border-slate-200">
              {data.meta.groupPhoto && (
                <img src={data.meta.groupPhoto} alt="" className="h-full w-full object-cover" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="text-xs uppercase tracking-widest text-white/70">{data.meta.title}</p>
                <h3 className="text-lg font-bold text-white">{data.meta.subtitle}</h3>
                <p className="text-sm text-white/75">{data.meta.description}</p>
              </div>
            </div>
          </section>

          {/* ── Team Members Section ── */}
          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Team Members ({data.members.length})</h2>
              <button
                onClick={addMember}
                className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-orange-700 transition-colors"
              >
                <Plus size={16} /> Add Member
              </button>
            </div>

            {data.members.length === 0 ? (
              <p className="text-sm text-slate-400 py-8 text-center">No team members yet. Click "Add Member" to create one.</p>
            ) : (
              <div className="space-y-2">
                {data.members.map((member, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50/50 p-3 group hover:border-slate-300 transition-colors">
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-slate-200">
                      {member.image && <img src={member.image} alt="" className="h-full w-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{member.name}</p>
                      <p className="text-xs text-slate-500 truncate">{member.title}{member.tagline ? ` — ${member.tagline}` : ""}</p>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => editMember(member)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => deleteMember(i)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-100 hover:text-red-600 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* ── Member Editor Modal ── */}
      {showMemberForm && editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => { if (memberFormDirty || confirm("Discard changes?")) { setShowMemberForm(false); setEditingMember(null); } }}>
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl border border-slate-200 mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">{data.members.find((m) => m.name === editingMember.name) ? "Edit Member" : "Add Member"}</h3>
              <button onClick={() => { setShowMemberForm(false); setEditingMember(null); }} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editingMember.title}
                  onChange={(e) => setEditingMember({ ...editingMember, title: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="Technical Manager, A-Hub"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Photo</label>
                <select
                  value={editingMember.image}
                  onChange={(e) => setEditingMember({ ...editingMember, image: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                >
                  {assets.map((a) => (
                    <option key={a.path} value={a.url}>{a.label}</option>
                  ))}
                </select>
                {editingMember.image && (
                  <img src={editingMember.image} alt="" className="mt-2 h-20 w-20 rounded-lg object-cover border border-slate-200" />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingMember.tagline ?? ""}
                  onChange={(e) => setEditingMember({ ...editingMember, tagline: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="A short description about the member"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Visit Link</label>
                <input
                  type="url"
                  value={editingMember.visitLink ?? ""}
                  onChange={(e) => setEditingMember({ ...editingMember, visitLink: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => { setShowMemberForm(false); setEditingMember(null); }}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveMember}
                disabled={!editingMember.name}
                className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-50 transition-colors"
              >
                {data.members.find((m) => m.name === editingMember.name) ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
