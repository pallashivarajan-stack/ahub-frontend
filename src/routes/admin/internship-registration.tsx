import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { isLoggedIn, saveInternshipRegistrationData, loadInternshipRegistrationData, getAssetOptions, type InternshipRegistration } from "@/services/adminService";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Plus, Pencil, Trash2, Save, Check, X } from "lucide-react";

export const Route = createFileRoute("/admin/internship-registration")({
  component: AdminInternshipRegistrationPage,
});

type AssetOption = { path: string; url: string; label: string };

function AdminInternshipRegistrationPage() {
  const navigate = useNavigate();
  const [internships, setInternships] = useState<InternshipRegistration[]>(() => loadInternshipRegistrationData());
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [assets, setAssets] = useState<AssetOption[]>([]);
  const [editingInternship, setEditingInternship] = useState<InternshipRegistration | null>(null);
  const [showInternshipForm, setShowInternshipForm] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate({ to: "/admin/login" });
    } else {
      setAuthed(true);
    }
  }, [navigate]);

  useEffect(() => {
    getAssetOptions("startups").then(setAssets);
  }, []);

  if (!authed) return null;

  const handleSave = async () => {
    setSaving(true);
    await saveInternshipRegistrationData(internships);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addInternship = () => {
    setEditingInternship({
      id: `internship-${Date.now()}`,
      companyName: "",
      role: "",
      logo: assets[0]?.url ?? "",
      duration: "8 Weeks",
      location: "Remote",
      domain: "Design",
      status: "New",
    });
    setShowInternshipForm(true);
  };

  const editInternship = (internship: InternshipRegistration) => {
    setEditingInternship({ ...internship });
    setShowInternshipForm(true);
  };

  const deleteInternship = (index: number) => {
    setInternships((prev) => prev.filter((_, i) => i !== index));
  };

  const saveInternship = () => {
    if (!editingInternship) return;
    setInternships((prev) => {
      const existing = prev.findIndex((i) => i.id === editingInternship.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = editingInternship;
        return updated;
      }
      return [...prev, editingInternship];
    });
    setShowInternshipForm(false);
    setEditingInternship(null);
  };

  const internshipFormDirty = editingInternship && (
    editingInternship.companyName ||
    editingInternship.role ||
    editingInternship.duration ||
    editingInternship.location ||
    editingInternship.domain
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />

      <main className="flex-1 overflow-auto">
        <div className="border-b border-slate-200 bg-white px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">Internship Registration Editor</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-50 transition-colors"
          >
            {saved ? <><Check size={16} /> Saved</> : <><Save size={16} /> {saving ? "Saving..." : "Save All"}</>}
          </button>
        </div>

        <div className="p-8 space-y-8 max-w-4xl">
          {/* ── Internships Section ── */}
          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Internship Listings ({internships.length})</h2>
              <button
                onClick={addInternship}
                className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-orange-700 transition-colors"
              >
                <Plus size={16} /> Add Internship
              </button>
            </div>

            {internships.length === 0 ? (
              <p className="text-sm text-slate-400 py-8 text-center">No internships yet. Click "Add Internship" to create one.</p>
            ) : (
              <div className="space-y-2">
                {internships.map((internship, i) => (
                  <div key={internship.id} className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50/50 p-3 group hover:border-slate-300 transition-colors">
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-slate-200">
                      {internship.logo && <img src={internship.logo} alt="" className="h-full w-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{internship.companyName} - {internship.role}</p>
                      <p className="text-xs text-slate-500 truncate">{internship.domain} · {internship.duration} · {internship.location} · {internship.status}</p>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => editInternship(internship)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => deleteInternship(i)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-100 hover:text-red-600 transition-colors">
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

      {/* ── Internship Editor Modal ── */}
      {showInternshipForm && editingInternship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => { if (internshipFormDirty || confirm("Discard changes?")) { setShowInternshipForm(false); setEditingInternship(null); } }}>
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl border border-slate-200 mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">{internships.find((i) => i.id === editingInternship.id) ? "Edit Internship" : "Add Internship"}</h3>
              <button onClick={() => { setShowInternshipForm(false); setEditingInternship(null); }} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={editingInternship.companyName}
                  onChange={(e) => setEditingInternship({ ...editingInternship, companyName: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="InterviewBuddy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                <input
                  type="text"
                  value={editingInternship.role}
                  onChange={(e) => setEditingInternship({ ...editingInternship, role: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="UI/UX Designer Intern"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Logo</label>
                <select
                  value={editingInternship.logo}
                  onChange={(e) => setEditingInternship({ ...editingInternship, logo: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                >
                  {assets.map((a) => (
                    <option key={a.path} value={a.url}>{a.label}</option>
                  ))}
                </select>
                {editingInternship.logo && (
                  <img src={editingInternship.logo} alt="" className="mt-2 h-20 w-20 rounded-lg object-cover border border-slate-200" />
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingInternship.duration}
                    onChange={(e) => setEditingInternship({ ...editingInternship, duration: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                    placeholder="8 Weeks"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingInternship.location}
                    onChange={(e) => setEditingInternship({ ...editingInternship, location: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                    placeholder="Remote"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Domain</label>
                  <input
                    type="text"
                    value={editingInternship.domain}
                    onChange={(e) => setEditingInternship({ ...editingInternship, domain: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                    placeholder="Design"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select
                    value={editingInternship.status}
                    onChange={(e) => setEditingInternship({ ...editingInternship, status: e.target.value as "Open" | "Applied" | "New" })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  >
                    <option value="Open">Open</option>
                    <option value="Applied">Applied</option>
                    <option value="New">New</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => { setShowInternshipForm(false); setEditingInternship(null); }}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveInternship}
                disabled={!editingInternship.companyName || !editingInternship.role}
                className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-50 transition-colors"
              >
                {internships.find((i) => i.id === editingInternship.id) ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}