import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { isLoggedIn } from "@/services/adminService";
import { ClipboardList, Users, GraduationCap, Building2, Calendar, Quote, Globe, MapPin, Share2 } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate({ to: "/admin/login" });
    } else {
      setAuthed(true);
    }
  }, [navigate]);

  if (!authed) return null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-500">Select a section from the sidebar to manage content.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link to="/admin/infrastructure" className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
              <Building2 size={24} />
            </div>
            <h3 className="mt-4 font-semibold text-slate-900">Infrastructure</h3>
            <p className="mt-1 text-sm text-slate-500">Manage infrastructure photos and images</p>
          </Link>
          <Link to="/admin/mentors" className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
              <GraduationCap size={24} />
            </div>
            <h3 className="mt-4 font-semibold text-slate-900">Mentors</h3>
            <p className="mt-1 text-sm text-slate-500">Manage mentors, photos, titles, and LinkedIn profiles</p>
          </Link>
          <Link to="/admin/board" className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
              <ClipboardList size={24} />
            </div>
            <h3 className="mt-4 font-semibold text-slate-900">Board</h3>
            <p className="mt-1 text-sm text-slate-500">Manage board members, photos, bios, and LinkedIn links</p>
          </Link>
          <Link to="/admin/team" className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
              <Users size={24} />
            </div>
            <h3 className="mt-4 font-semibold text-slate-900">Team Page</h3>
            <p className="mt-1 text-sm text-slate-500">Edit team members, group photo, and page text</p>
          </Link>
          <Link to="/admin/latest-events" className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
              <Calendar size={24} />
            </div>
            <h3 className="mt-4 font-semibold text-slate-900">Latest Events</h3>
            <p className="mt-1 text-sm text-slate-500">Manage homepage events carousel cards</p>
          </Link>
          <Link to="/admin/testimonials" className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
              <Quote size={24} />
            </div>
            <h3 className="mt-4 font-semibold text-slate-900">Testimonials</h3>
            <p className="mt-1 text-sm text-slate-500">Manage founder testimonials and quotes</p>
          </Link>
          <Link to="/admin/partners-logos" className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
              <Globe size={24} />
            </div>
            <h3 className="mt-4 font-semibold text-slate-900">Partners & Mesh Network</h3>
            <p className="mt-1 text-sm text-slate-500">Manage partner logos for Associated With and Mesh Network</p>
          </Link>
          <Link to="/admin/visitors" className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
              <MapPin size={24} />
            </div>
            <h3 className="mt-4 font-semibold text-slate-900">Distinguished Visitors</h3>
            <p className="mt-1 text-sm text-slate-500">Manage visitor profiles and marquee</p>
          </Link>
          <Link to="/admin/find-us-on" className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
              <Share2 size={24} />
            </div>
            <h3 className="mt-4 font-semibold text-slate-900">Find Us On</h3>
            <p className="mt-1 text-sm text-slate-500">Manage social media links and embeds</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
