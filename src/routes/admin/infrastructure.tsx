import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  isLoggedIn,
  loadInfrastructureData,
  saveInfrastructureData,
  getInfrastructureAssetOptions,
  type InfrastructureImages,
} from "@/services/adminService";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Save, Check } from "lucide-react";
import { infrastructureImages } from "@/data/infrastructurePage";

export const Route = createFileRoute("/admin/infrastructure")({
  component: AdminInfrastructurePage,
});

type AssetOption = { path: string; url: string; label: string };

type SectionGroup = {
  title: string;
  description: string;
  fields: { key: keyof InfrastructureImages; label: string }[];
};

const SECTIONS: SectionGroup[] = [
  {
    title: "Hero Image",
    description: "Main hero image for the infrastructure page",
    fields: [{ key: "hero", label: "Hero Image" }],
  },
  {
    title: "Gallery Strip",
    description: "Gallery strip carousel shown on the page",
    fields: [
      { key: "galleryCoworking", label: "Coworking Space" },
      { key: "galleryStartupBays", label: "Startup Bays" },
      { key: "galleryEventHall", label: "Event Hall" },
      { key: "gallerySeminarRoom", label: "Seminar Room" },
      { key: "galleryInnovationLabs", label: "Innovation Labs" },
    ],
  },
  {
    title: "Side Images",
    description: "Side images for Collaborative, Research, Events & Facility sections",
    fields: [
      { key: "collaborative", label: "Collaborative Environment" },
      { key: "labs", label: "Advanced Research Facilities" },
      { key: "conference", label: "Events & Community Spaces" },
      { key: "campus", label: "Facility Gallery" },
    ],
  },
  {
    title: "Masonry Gallery",
    description: "Masonry gallery images displayed in a grid layout",
    fields: [
      { key: "masonryCampus", label: "AHUB Campus" },
      { key: "masonryIoT", label: "IoT & Robotics Lab" },
      { key: "masonryCollaborative", label: "Collaborative Zones" },
      { key: "masonryConference", label: "Conference Hall" },
      { key: "masonryWorkspace", label: "Founder Workspace" },
      { key: "masonryResearch", label: "Research Lab" },
    ],
  },
];

function AdminInfrastructurePage() {
  const navigate = useNavigate();
  const [data, setData] = useState<InfrastructureImages>(() => {
    const loaded = loadInfrastructureData();
    const result = { ...infrastructureImages };
    for (const k of Object.keys(result) as (keyof InfrastructureImages)[]) {
      if (loaded[k]) result[k] = loaded[k];
    }
    return result;
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [assets, setAssets] = useState<AssetOption[]>([]);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) { navigate({ to: "/admin/login" }); }
    else { setAuthed(true); }
  }, [navigate]);

  useEffect(() => {
    getInfrastructureAssetOptions().then(setAssets);
  }, []);

  if (!authed) return null;

  const handleSave = async () => {
    setSaving(true);
    await saveInfrastructureData(data);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateField = (key: keyof InfrastructureImages, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />

      <main className="flex-1 overflow-auto">
        <div className="border-b border-slate-200 bg-white px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">Infrastructure</h1>
          <p className="hidden sm:block text-sm text-slate-500">Manage infrastructure images. Each section feeds a different part of the public infrastructure page.</p>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-50 transition-colors"
          >
            {saved ? <><Check size={16} /> Saved</> : <><Save size={16} /> {saving ? "Saving..." : "Save All"}</>}
          </button>
        </div>

        <div className="p-8 space-y-10 max-w-4xl">
          {assets.length === 0 ? (
            <p className="text-sm text-slate-400 py-12 text-center">No infrastructure assets found in src/assets/infastructure/.</p>
          ) : (
            SECTIONS.map((section) => (
              <section key={section.title} className="space-y-4">
                <div className="border-b border-slate-200 pb-2">
                  <h2 className="text-lg font-bold text-slate-900">{section.title}</h2>
                  <p className="text-sm text-slate-500 mt-0.5">{section.description}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {section.fields.map(({ key, label }) => (
                    <ImagePicker
                      key={key}
                      label={label}
                      value={data[key]}
                      assets={assets}
                      onChange={(val) => updateField(key, val)}
                    />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

function ImagePicker({
  label,
  value,
  assets,
  onChange,
}: {
  label: string;
  value: string;
  assets: AssetOption[];
  onChange: (val: string) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <label className="block text-sm font-semibold text-slate-800 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none mb-3"
      >
        {assets.map((a) => (
          <option key={a.path} value={a.url}>{a.label}</option>
        ))}
      </select>
      <div className="rounded-lg overflow-hidden border border-slate-200">
        <img
          src={value}
          alt={label}
          className="w-full h-36 object-cover"
          onError={(e) => console.error("Image load error for", value, e)}
        />
      </div>
      <p className="mt-1 text-[10px] text-slate-400 truncate" title={value}>{value}</p>
    </div>
  );
}
