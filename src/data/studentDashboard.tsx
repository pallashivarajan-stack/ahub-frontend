export type StartupOpportunity = {
  id: string;
  name: string;
  role: string;
  duration: string;
  stipend: string;
  locationType: "Remote" | "Hybrid" | "On-site";
  logoComponent?: React.ComponentType;
  logoUrl?: string;
};

export type RoadmapStep = {
  id: string;
  title: string;
  date: string;
  desc: string;
  status: "completed" | "upcoming";
};

const ZeptoLogo = () => (
  <svg viewBox="0 0 100 30" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 25C18.6274 25 24 19.6274 24 13C24 6.37258 18.6274 1 12 1C5.37258 1 0 6.37258 0 13C0 19.6274 5.37258 25 12 25Z" fill="#522C90" />
    <path d="M9 8H16L11 14H16L13 19H10L13 14H9V8Z" fill="#FFC72C" />
    <text x="30" y="20" fill="#522C90" className="font-extrabold text-[17px] tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>zepto</text>
  </svg>
);

const RazorpayLogo = () => (
  <svg viewBox="0 0 120 30" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 25L14 3L26 25H16L12 18H5L2 25H0Z" fill="#0B72E7" />
    <path d="M14 11L10 17H5L10 11H14Z" fill="#00D2FF" />
    <text x="32" y="21" fill="#0B72E7" className="font-black text-[18px] tracking-tighter" style={{ fontFamily: "Inter, sans-serif" }}>Razorpay</text>
  </svg>
);

const CredLogo = () => (
  <svg viewBox="0 0 80 30" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="2" width="22" height="22" rx="4" fill="#111111" />
    <circle cx="11" cy="13" r="6" stroke="#FFFFFF" strokeWidth="2.5" />
    <text x="28" y="19" fill="#111111" className="font-bold text-[17px] tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>CRED</text>
  </svg>
);

const GrowwLogo = () => (
  <svg viewBox="0 0 90 30" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="13" r="10" fill="#00D09C" />
    <path d="M7 16L11 12L13 14L17 9.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <text x="28" y="20" fill="#092C3C" className="font-black text-[17px]" style={{ fontFamily: "Inter, sans-serif" }}>Groww</text>
  </svg>
);

const UrbanCompanyLogo = () => (
  <svg viewBox="0 0 140 30" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="4" width="18" height="18" fill="#000000" />
    <text x="5" y="18" fill="#FFFFFF" className="font-bold text-[12px]" style={{ fontFamily: "Inter, sans-serif" }}>UC</text>
    <text x="24" y="18" fill="#000000" className="font-bold text-[14px]" style={{ fontFamily: "Inter, sans-serif" }}>Urban Company</text>
  </svg>
);

const SwiggyLogo = () => (
  <svg viewBox="0 0 100 30" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14.15 15.65C13.48 16.32 12.02 16.78 10.5 15.98C8.98 15.18 8.12 13.98 8.12 12.82C8.12 11.66 9.22 10.35 10.72 10.82C12.22 11.29 13.88 12.18 13.88 13.38C13.88 14.58 14.82 14.98 14.15 15.65Z" fill="#FC8019" />
    <text x="28" y="18" fill="#FC8019" className="font-extrabold text-[17px]" style={{ fontFamily: "Inter, sans-serif" }}>SWIGGY</text>
  </svg>
);

const MeeshoLogo = () => (
  <svg viewBox="0 0 95 30" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 24L12 4L22 24H15L12 17L9 24H2Z" fill="#F43397" />
    <circle cx="12" cy="11" r="3" fill="#F43397" />
    <text x="28" y="20" fill="#F43397" className="font-extrabold text-[17px]" style={{ fontFamily: "Inter, sans-serif" }}>meesho</text>
  </svg>
);

const CashfreeLogo = () => (
  <svg viewBox="0 0 120 30" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2H2V18H18V2ZM16 16H4V4H16V16Z" fill="#0084FF" />
    <path d="M10 6H6V14H10V12H8V8H10V6Z" fill="#00D1FF" />
    <text x="26" y="18" fill="#0A2540" className="font-black text-[16px]" style={{ fontFamily: "Inter, sans-serif" }}>cashfree</text>
  </svg>
);

const PorterLogo = () => (
  <svg viewBox="0 0 90 30" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="4" width="18" height="18" rx="3" fill="#004E9A" />
    <circle cx="9" cy="13" r="5" fill="#FFE600" />
    <text x="24" y="19" fill="#004E9A" className="font-extrabold text-[17px]" style={{ fontFamily: "Inter, sans-serif" }}>PORTER</text>
  </svg>
);

const PwLogo = () => (
  <svg viewBox="0 0 100 30" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="13" cy="13" r="11" fill="#1C1E21" />
    <text x="6" y="18" fill="#FFFFFF" className="font-bold text-[12px] tracking-tighter" style={{ fontFamily: "Inter, sans-serif" }}>PW</text>
    <text x="30" y="19" fill="#1C1E21" className="font-extrabold text-[15px]" style={{ fontFamily: "Inter, sans-serif" }}>PhysicsWallah</text>
  </svg>
);

export const STARTUPS_DATA: StartupOpportunity[] = [
  { id: "zepto-pm", name: "Zepto", role: "Product Management Intern", duration: "3 - 6 Months", stipend: "₹40,000 / month", locationType: "Remote", logoComponent: ZeptoLogo },
  { id: "razorpay-eng", name: "Razorpay", role: "Engineering Intern", duration: "3 - 6 Months", stipend: "₹50,000 / month", locationType: "Hybrid", logoComponent: RazorpayLogo },
  { id: "cred-da", name: "CRED", role: "Data Analyst Intern", duration: "3 - 6 Months", stipend: "₹45,000 / month", locationType: "Hybrid", logoComponent: CredLogo },
  { id: "groww-swe", name: "Groww", role: "Software Engineer Intern", duration: "6 Months", stipend: "₹60,000 / month", locationType: "Hybrid", logoComponent: GrowwLogo },
  { id: "uc-design", name: "Urban Company", role: "Product Design Intern", duration: "3 Months", stipend: "₹35,000 / month", locationType: "Remote", logoComponent: UrbanCompanyLogo },
  { id: "swiggy-growth", name: "Swiggy", role: "Growth Marketing Intern", duration: "2 - 4 Months", stipend: "₹25,000 / month", locationType: "Remote", logoComponent: SwiggyLogo },
  { id: "meesho-ops", name: "Meesho", role: "Operations Management Associate", duration: "3 - 6 Months", stipend: "₹30,000 / month", locationType: "Hybrid", logoComponent: MeeshoLogo },
  { id: "cashfree-be", name: "Cashfree", role: "Backend Developer Intern", duration: "6 Months", stipend: "₹45,000 / month", locationType: "Remote", logoComponent: CashfreeLogo },
  { id: "porter-strategy", name: "Porter", role: "Founder's Office Strategy Intern", duration: "3 Months", stipend: "₹35,000 / month", locationType: "Hybrid", logoComponent: PorterLogo },
  { id: "pw-edu", name: "PhysicsWallah", role: "Educational Content Intern", duration: "3 Months", stipend: "₹20,000 / month", locationType: "Remote", logoComponent: PwLogo },
];

export const ROADMAP_STEPS: RoadmapStep[] = [
  { id: "reg", title: "Internship Registration", date: "10 May 2026", desc: "Complete student profile and upload resume.", status: "completed" },
  { id: "screen", title: "Resume Screening", date: "15 May 2026", desc: "Shortlist matching candidates for interviews.", status: "completed" },
  { id: "test", title: "Assessment Test", date: "20 May 2026", desc: "Aptitude, problem solving, & coding skills.", status: "completed" },
  { id: "interview", title: "Interview Round", date: "28 May 2026", desc: "Technical panel interaction & product fit check.", status: "upcoming" },
  { id: "offer", title: "Offer Letter", date: "05 Jun 2026", desc: "Verify compensation, role outlines, and terms.", status: "upcoming" },
  { id: "start", title: "Internship Start", date: "15 Jun 2026", desc: "Kick off journey with portfolio startup onboarding.", status: "upcoming" },
];

export type StudentDashboardData = {
  startups: StartupOpportunity[];
  roadmap: RoadmapStep[];
};
