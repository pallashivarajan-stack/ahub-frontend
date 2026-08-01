import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { isLoggedIn, loadMeshNetworkData, saveMeshNetworkData, getAssetOptions } from "@/services/adminService";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Plus, Trash2, Save, Check, X } from "lucide-react";

export const Route = createFileRoute("/admin/mesh-network")({
  component: AdminMeshNetworkPage,
});

type AssetOption = { path: string; url: string; label: string };

function AdminMeshNetworkPage() {
  const navigate = useNavigate();
  const [logos, setLogos] = useState<string[]>(() => loadMeshNetworkData());
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [assets, setAssets] = useState<AssetOption[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) { navigate({ to: "/admin/login" }); }
    else { setAuthed(true); }
  }, [navigate]);

  useEffect(() => {
    getAssetOptions("partners").then(setAssets);
  }, []);

  if (!authed) return null;

  const handleSave = async () => {
    setSaving(true);
    await saveMeshNetworkData(logos);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addLogo = () => {
    if (selectedAsset && !logos.includes(selectedAsset)) {
      setLogos((prev) => [...prev, selectedAsset]);
      setSelectedAsset("");
      setShowAdd(false);
    }
  };

  const removeLogo = (i: number) => {
    setLogos((prev) => prev.filter((_, idx) => idx !== i));
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="border-b border-slate-200 bg-white px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Mesh Network Logos</h1>
            <p className="text-xs text-slate-500 mt-0.5">Controls logos for the "Mesh Network" section</p>
          </div>
          <button onClick={handleSave} disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-50 transition-colors">
            {saved ? <><Check size={16} /> Saved</> : <><Save size={16} /> {saving ? "Saving..." : "Save All"}</>}
          </button>
        </div>

        <div className="p-8 space-y-6 max-w-4xl">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">{logos.length} logo{logos.length !== 1 ? "s" : ""}</p>
            <button onClick={() => { setSelectedAsset(assets[0]?.url ?? ""); setShowAdd(true); }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-orange-700 transition-colors">
              <Plus size={16} /> Add Logo
            </button>
          </div>

          {logos.length === 0 ? (
            <p className="text-sm text-slate-400 py-12 text-center">No logos yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {logos.map((logo, i) => (
                <div key={i} className="relative group rounded-xl border border-slate-200 bg-white p-3 flex items-center justify-center h-28 hover:border-slate-300 transition-colors shadow-sm">
                  <img src={logo} alt="" className="max-h-20 max-w-full object-contain" />
                  <button onClick={() => removeLogo(i)}
                    className="absolute top-1 right-1 rounded-lg p-1 text-slate-400 opacity-0 group-hover:opacity-100 hover:bg-red-100 hover:text-red-600 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowAdd(false)}>
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl border border-slate-200 mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Add Mesh Network Logo</h3>
              <button onClick={() => setShowAdd(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Select Logo</label>
                <select value={selectedAsset} onChange={(e) => setSelectedAsset(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none">
                  <option value="">-- Choose an image --</option>
                  {assets.filter((a) => !logos.includes(a.url)).map((a) => (
                    <option key={a.path} value={a.url}>{a.label}</option>
                  ))}
                </select>
                {selectedAsset && <img src={selectedAsset} alt="" className="mt-2 h-20 w-32 rounded-lg object-contain border border-slate-200 bg-white" />}
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowAdd(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
              <button onClick={addLogo} disabled={!selectedAsset}
                className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-50">
                Add Logo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
