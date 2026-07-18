import { useState, useRef, useEffect } from "react";
import { usePublicInternshipRegistration } from "@/services/usePublicContent";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  MapPin,
  Clock,
  Send,
  User,
  Mail,
  Calendar,
  Briefcase,
  Upload,
  FileCheck,
  Building,
  Award,
  TrendingUp,
  ChevronRight,
  X,
} from "lucide-react";

import { resolveLegacyAsset } from "@/lib/assets";

type StartupInternship = {
  id: string;
  companyName: string;
  role: string;
  logo: string;
  duration: string;
  location: string;
  domain: string;
  status: "Open" | "Applied" | "New";
  detailedInfo?: {
    date: string;
    description: string;
    responsibilities: string[];
    skills: string[];
    prerequisites: string[];
    process: string;
    benefits?: string[];
  };
};

const DEFAULT_INTERNSHIPS: StartupInternship[] = [
  {
    id: "ib-ai",
    companyName: "InterviewBuddy",
    role: "UI/UX Designer Intern",
    logo: resolveLegacyAsset("/src/assets/startups/interview buddy.png"),
    duration: "12 Weeks",
    location: "Remote",
    domain: "Design",
    status: "Applied",
    detailedInfo: {
      date: "February 20, 2025",
      description: "Design is where a product’s life-cycle begins and as such determines the success of the product to a measurable degree, making the role of a UI/UX Designer indispensable. One’s responsibilities would involve working with multiple teams to learn & understand user requirements to design interfaces and experiences that resonate perfectly with consumers expectations.",
      responsibilities: [
        "Understand the product requirements.",
        "Conduct user research & create detailed, comprehensive and well-structured documentation as required.",
        "Adhere to style standards on fonts, colours and images.",
        "Gather and evaluate user requirements, in collaboration with product managers and engineers.",
        "Illustrate design ideas using storyboards, process flows and sitemaps.",
        "Design user interface elements & components, like menus, buttons and cards.",
        "Develop UI mockups and prototypes that clearly illustrate how sites function and look like."
      ],
      skills: [
        "Concept mapping & Story boarding",
        "Wireframing",
        "Visual design",
        "Prototyping",
        "Figma"
      ],
      prerequisites: [
        "Excellent Communication - Verbal and Written.",
        "Good knowledge about Google Sheets and Google Drive.",
        "Ability to understand the elements of a product and comprehend the logic behind actions & flows.",
        "Ability to quickly learn new concepts & approaches as required."
      ],
      process: "Interested candidates should submit their resume to interviewbuddy.net or visit our website interviewbuddy.net"
    }
  },
  {
    id: "rhodium-ops",
    companyName: "Rhodium Tech",
    role: "Designated Operations Person",
    logo: resolveLegacyAsset("/src/assets/testimonals/rhodium tech.jpg"),
    duration: "Full Time",
    location: "On-site",
    domain: "Operations",
    status: "Open",
    detailedInfo: {
      date: "February 20, 2025",
      description: "Rhodium Tech is recruiting a Designated Operations Person to oversee industrial spare query handling, port operations, and office functions in addition to monitoring fieldwork. The job provides first-hand experience in logistics, procurement, and operations management. Good communication skills and a personal computer and vehicle are a must, and freshers are also encouraged to apply.",
      responsibilities: [
        "Enquiries of Industrial Spares/Items.",
        "Port Operations – Berthing Schedule and Vessel Status",
        "Representing Negotiations on behalf of the company.",
        "Bank Related Works.",
        "Office Paper Work includes Orders and Invoices.",
        "Supervising the field works."
      ],
      skills: [
        "Should be punctual",
        "Office timings are 0830-1830 hours",
        "Should be able to manage port operations and supervise other field works",
        "Good Communication Skills",
        "Should have personal computer and vehicle"
      ],
      prerequisites: [
        "Undergraduate (PASS/FAIL) with minimum English speaking skills."
      ],
      benefits: [
        "Hands-on experience in logistics and operational management.",
        "Exposure to port operations, procurement, and field supervision.",
        "Opportunity to develop negotiation and communication skills.",
        "Certification of experience upon completion.",
        "Potential for future growth based on performance."
      ],
      process: "Interested candidates should submit their resume to rhodium.tech6@gmail.com. Or can contact Ph: +91-7731878897"
    }
  },
  {
    id: "g2v-eng",
    companyName: "G2V Solar",
    role: "Engineering CAD Intern",
    logo: resolveLegacyAsset("/src/assets/testimonals/g2v_solar_solutions_pvt_ltd_logo.jpg"),
    duration: "Full Time",
    location: "On-site",
    domain: "Engineering",
    status: "Open",
    detailedInfo: {
      date: "February 20, 2025",
      description: "G2V Solar is seeking a motivated Engineering CAD Intern to assist our design and engineering team in creating detailed solar PV system layouts and technical drawings. This role offers hands-on experience with industry-standard CAD tools and an opportunity to work on real-world renewable energy projects.",
      responsibilities: [
        "CAD Drawing & Drafting: Assist in preparing 2D and 3D CAD models for solar PV systems; Create detailed engineering drawings for mounting structures, electrical layouts, and site plans; Ensure compliance with company guidelines and project specifications.",
        "Design Support & Optimization: Collaborate with the design team to develop solar PV layouts based on site survey data; Perform basic shading analysis and evaluate solar panel placements for optimal efficiency; Assist in modifying designs based on feedback from engineers and project managers.",
        "Documentation & Compliance: Maintain updated records of drawings and design iterations; Assist in preparing documentation for project approvals and regulatory compliance.",
        "Software Utilization: Work with software tools such as AutoCAD, SketchUp, SolidWorks, and PVsyst (training will be provided if necessary); Support engineers in preparing simulations and reports for solar system performance analysis.",
        "Interdepartmental Coordination: Communicate with the procurement, project management, and installation teams to ensure design feasibility; Participate in meetings and contribute to discussions regarding system design improvements.",
        "Site Visits & Field Work (If required): Assist in on-site data collection, including measurements and feasibility assessments; Support the installation team in verifying design implementation on-site."
      ],
      skills: [
        "Proficiency in AutoCAD (mandatory).",
        "Proficiency in MS Excel.",
        "Familiarity with SketchUp, SolidWorks, PVsyst, or other relevant design software is a plus.",
        "Basic understanding of electrical and structural aspects of solar PV systems.",
        "Analytical & Problem-Solving Skills: Ability to analyze design problems and suggest improvements.",
        "Communication: Strong verbal and written communication skills.",
        "Attention to Detail: Accuracy in drafting and documentation.",
        "Team Player: Ability to work collaboratively in a fast-paced environment."
      ],
      prerequisites: [
        "Pursuing or recently completed a Diploma/Degree in Mechanical, Civil, Electrical, or Renewable Energy Engineering."
      ],
      benefits: [
        "Hands-on experience in the growing renewable energy industry.",
        "Exposure to real-world solar projects and technical design processes.",
        "Mentorship from experienced engineers.",
        "Certificate of internship completion.",
        "Potential for future employment based on performance."
      ],
      process: "Interested candidates should submit their resume to inc@g2vsolar.com with the subject line “Application for Engineering CAD Intern.”"
    }
  },
  {
    id: "pb-da",
    companyName: "Pick A Book",
      role: "Data Analyst Intern",
      logo: resolveLegacyAsset("/src/assets/startups/pick a book.png"),
      duration: "8 Weeks",
      location: "Remote",
      domain: "Data Science",
      status: "Open",
    },
    {
      id: "ta-ml",
      companyName: "Tierra Automations",
      role: "ML Ops Intern",
      logo: resolveLegacyAsset("/src/assets/startups/antar iot.png"),
      duration: "12 Weeks",
      location: "Hybrid",
      domain: "AI/ML",
      status: "Open",
    },
    {
      id: "sw-pd",
      companyName: "Swaya",
      role: "Product Design Intern",
      logo: resolveLegacyAsset("/src/assets/startups/sweya.png"),
      duration: "8 Weeks",
      location: "Remote",
      domain: "Product Design",
      status: "New",
    },
];

export function InternshipRegistrationPage() {
  const { data: internshipsData } = usePublicInternshipRegistration(DEFAULT_INTERNSHIPS);
  
  const mergeDefaults = (data: StartupInternship[]) => {
    return data.map(item => {
      const def = DEFAULT_INTERNSHIPS.find(d => d.id === item.id);
      return {
        ...item,
        detailedInfo: item.detailedInfo ?? def?.detailedInfo,
        role: def?.role ?? item.role
      };
    });
  };

  const [internships, setInternships] = useState<StartupInternship[]>(() => mergeDefaults(internshipsData ?? DEFAULT_INTERNSHIPS));

  useEffect(() => {
    if (internshipsData) {
      setInternships(mergeDefaults(internshipsData));
    }
  }, [internshipsData]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    skills: "",
    domain: "",
    motivation: "",
  });

  const [resumeName, setResumeName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState<StartupInternship | null>(null);
  
  const formRef = useRef<HTMLDivElement | null>(null);

  const handleInfoClick = (internship: StartupInternship) => {
    setSelectedInternship(internship);
  };

  const handleApplyClick = (internship: StartupInternship) => {
    setFormData((prev) => ({
      ...prev,
      domain: internship.domain,
    }));
    
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Update matching internship status to 'Applied'
    setInternships((prev) =>
      prev.map((item) => {
        if (item.domain === formData.domain && item.status !== "Applied") {
          return { ...item, status: "Applied" };
        }
        return item;
      })
    );

    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        fullName: "",
        email: "",
        dob: "",
        skills: "",
        domain: "",
        motivation: "",
      });
      setResumeName("");
    }, 4500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FDF8F2] pb-20 pt-14 md:pb-32 md:pt-16 lg:pt-20">
      
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-36 top-20 h-96 w-96 rounded-full bg-[#F59E42]/8 blur-[100px]" />
        <div className="absolute -right-24 top-72 h-[480px] w-[480px] rounded-full bg-[#FFE8D0]/50 blur-[120px]" />
        <div className="absolute bottom-40 left-1/4 h-[350px] w-[350px] rounded-full bg-[#FFF4E8]/60 blur-[100px]" />
      </div>

      <div className="relative site-container-wide">
        
        {/* PAGE HEADER */}
        <div className="relative flex flex-col items-center text-center">
          {/* Internships Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#F59E42]/25 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F59E42] shadow-sm backdrop-blur-sm"
          >
            <Calendar className="h-3.5 w-3.5" />
            INTERNSHIPS
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-3xl font-extrabold tracking-tight text-[#2D1B1B] sm:text-4xl md:text-5xl"
          >
            Internship Opportunities
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-base text-[#6C5E5B]"
          >
            Explore structured internship programs from top startups and build your career.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 h-1 w-16 rounded-full bg-[#F59E42]"
          />

        </div>

        {/* INTERNSHIP OPPORTUNITIES GRID */}
        <section className="mt-16 sm:mt-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {internships.map((internship, index) => (
              <motion.article
                key={internship.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-white/60 bg-white p-6 shadow-[0_12px_36px_-20px_rgba(45,27,27,0.06)] hover:border-[#F59E42]/20 hover:shadow-[0_20px_45px_-15px_rgba(245,158,66,0.16)] transition-all duration-300"
              >


                {/* Center: Large Centered Logo Container */}
                <div className="mt-6 flex justify-center">
                  <div className="flex h-32 w-32 items-center justify-center rounded-[20px] bg-[#FFF8F2] border border-[#F5E6D3]/30 p-4 shadow-sm group-hover:scale-103 transition duration-300">
                    <img
                      src={internship.logo}
                      alt={`${internship.companyName} logo`}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Company Name & Role */}
                <div className="mt-6 text-center">
                  <p className="text-xs font-semibold text-[#6C5E5B] tracking-wide">{internship.companyName}</p>
                  <h3 className="mt-1 text-lg font-extrabold text-[#2D1B1B] leading-tight group-hover:text-[#F59E42] transition-colors">
                    {internship.role}
                  </h3>
                </div>

                {/* Metadata */}
                <div className="mt-4 flex items-center justify-center gap-4 border-t border-slate-50 pt-4 text-xs font-medium text-[#6C5E5B]">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-[#F59E42]" />
                    <span>{internship.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-[#F59E42]" />
                    <span>{internship.location}</span>
                  </div>
                </div>

                {/* Bottom CTA Arrow */}
                <button
                  type="button"
                  onClick={() => handleInfoClick(internship)}
                  className="mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-[#FDF8F2] text-slate-700 hover:text-white hover:bg-[#F59E42] group-hover:border-[#F59E42]/20 transition-all self-center shadow-sm"
                >
                  <ChevronRight className="h-5 w-5 transform transition-transform group-hover:translate-x-0.5" />
                </button>
              </motion.article>
            ))}
          </div>
        </section>

        {/* REGISTRATION FORM SECTION */}
        <section ref={formRef} className="mt-16 sm:mt-24 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white p-6 sm:p-10 md:p-12 shadow-[0_24px_60px_-15px_rgba(45,27,27,0.08)]"
          >
            {/* Form Background Accent */}
            <div className="absolute top-[-30%] right-[-10%] h-[350px] w-[350px] rounded-full bg-[#FFF4E8]/20 blur-3xl pointer-events-none" />

            <div className="relative flex flex-col items-center text-center">
              <h2 className="relative inline-block text-2xl font-[900] text-[#2D1B1B] md:text-3xl">
                Registration Form
                <span className="absolute bottom-[-6px] left-1/2 h-[3px] w-16 -translate-x-1/2 rounded-full bg-[#F59E42]" />
              </h2>
              <p className="mt-4 text-xs text-[#6C5E5B] sm:text-sm">
                Fill in your details to apply for internship opportunities.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {formSubmitted ? (
                <motion.div
                  key="form-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mt-12 py-10 flex flex-col items-center text-center justify-center bg-[#FDF8F2]/60 rounded-[24px] border border-slate-100/50"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm border border-emerald-200 animate-bounce">
                    <FileCheck className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-xl font-extrabold text-[#2D1B1B]">
                    Application Submitted!
                  </h3>
                  <p className="mt-2 max-w-sm text-xs leading-relaxed text-[#6C5E5B] sm:text-sm">
                    Thank you for applying. The respective startup team will review your application details, motiv-sheet, and resume and respond via email.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form-input"
                  onSubmit={handleFormSubmit}
                  className="mt-10 md:mt-12 space-y-6"
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Full Name */}
                    <label className="flex flex-col gap-2 text-xs font-bold text-slate-700">
                      <span>Full Name</span>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="e.g., John Doe"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full rounded-2xl border border-slate-200 bg-[#FFFBF8]/30 py-3.5 pl-11 pr-4 text-xs text-slate-950 outline-none transition focus:border-[#F59E42] focus:bg-white"
                        />
                      </div>
                    </label>

                    {/* Email */}
                    <label className="flex flex-col gap-2 text-xs font-bold text-slate-700">
                      <span>Email Address</span>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          type="email"
                          required
                          placeholder="e.g., john@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-2xl border border-slate-200 bg-[#FFFBF8]/30 py-3.5 pl-11 pr-4 text-xs text-slate-950 outline-none transition focus:border-[#F59E42] focus:bg-white"
                        />
                      </div>
                    </label>

                    {/* Date of Birth */}
                    <label className="flex flex-col gap-2 text-xs font-bold text-slate-700">
                      <span>Date of Birth</span>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          type="date"
                          required
                          value={formData.dob}
                          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                          className="w-full rounded-2xl border border-slate-200 bg-[#FFFBF8]/30 py-3.5 pl-11 pr-4 text-xs text-slate-950 outline-none transition focus:border-[#F59E42] focus:bg-white"
                        />
                      </div>
                    </label>

                    {/* Skills */}
                    <label className="flex flex-col gap-2 text-xs font-bold text-slate-700">
                      <span>Skills</span>
                      <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="e.g., React, Python, SQL, Figma"
                          value={formData.skills}
                          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                          className="w-full rounded-2xl border border-slate-200 bg-[#FFFBF8]/30 py-3.5 pl-11 pr-4 text-xs text-slate-950 outline-none transition focus:border-[#F59E42] focus:bg-white"
                        />
                      </div>
                    </label>

                    {/* Resume Upload */}
                    <div className="flex flex-col gap-2 text-xs font-bold text-slate-700">
                      <span>Resume Upload</span>
                      <div className="relative flex h-[50px] w-full items-center justify-between rounded-2xl border border-slate-200 bg-[#FFFBF8]/30 pl-11 pr-4 outline-none transition hover:border-[#F59E42]">
                        <Upload className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <span className="truncate text-slate-600 font-normal">
                          {resumeName || "Upload your resume (PDF/DOC)"}
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          required={!resumeName}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setResumeName(file.name);
                          }}
                          className="absolute inset-0 cursor-pointer opacity-0"
                        />
                        <span className="rounded-lg bg-[#FFF4E8] px-2.5 py-1.5 text-[10px] font-bold text-[#F59E42] uppercase shadow-sm">
                          Browse
                        </span>
                      </div>
                    </div>

                    {/* Preferred Domain */}
                    <label className="flex flex-col gap-2 text-xs font-bold text-slate-700">
                      <span>Preferred Domain</span>
                      <div className="relative">
                        <select
                          required
                          value={formData.domain}
                          onChange={(e) => {
                            setFormData({ ...formData, domain: e.target.value });
                          }}
                          className="w-full appearance-none rounded-2xl border border-slate-200 bg-[#FFFBF8]/30 py-3.5 pl-4 pr-10 text-xs text-slate-950 outline-none transition focus:border-[#F59E42] focus:bg-white"
                        >
                          <option value="">Select your preferred domain</option>
                          {["Frontend", "Backend", "AI/ML", "Data Science", "Product Design", "Marketing"].map((dom) => (
                            <option key={dom} value={dom}>
                              {dom}
                            </option>
                          ))}
                        </select>
                        <ChevronRight className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" />
                      </div>
                    </label>
                  </div>

                  {/* Motivation */}
                  <label className="block flex flex-col gap-2 text-xs font-bold text-slate-700">
                    <span>Motivation</span>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us why you want this internship..."
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                      className="w-full rounded-2xl border border-slate-200 bg-[#FFFBF8]/30 p-4 text-xs text-slate-950 outline-none transition focus:border-[#F59E42] focus:bg-white"
                    />
                  </label>

                  {/* Submit Button */}
                  <div className="mt-8 flex justify-center">
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#F59E42] to-[#FF8C42] px-8 py-4 text-sm font-semibold text-white shadow-[0_12px_28px_-6px_rgba(245,158,66,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-4px_rgba(245,158,66,0.45)] hover:brightness-105 active:scale-[0.98]"
                    >
                      <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      Submit Application
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* BENEFITS STRIP */}
        <section className="mt-16 sm:mt-24">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Verified Opportunities",
                desc: "All internships are verified by our team.",
                icon: FileCheck,
                color: "bg-orange-50 text-[#F59E42]",
              },
              {
                title: "Top Startups",
                desc: "Work with innovative startups.",
                icon: Building,
                color: "bg-blue-50 text-blue-600",
              },
              {
                title: "Career Growth",
                desc: "Gain real-world experience and grow.",
                icon: TrendingUp,
                color: "bg-emerald-50 text-emerald-600",
              },
              {
                title: "Certificate",
                desc: "Earn a completion certificate.",
                icon: Award,
                color: "bg-purple-50 text-[#8050FF]",
              },
            ].map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex flex-col items-center text-center rounded-[20px] bg-white p-5 border border-white/80 shadow-[0_8px_20px_-8px_rgba(45,27,27,0.06)]"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${benefit.color} shadow-sm mb-4`}>
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h4 className="text-sm font-extrabold text-[#2D1B1B]">{benefit.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#6C5E5B]">{benefit.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
      {/* INTERNSHIP DETAILS DIALOG */}
      <AnimatePresence>
        {selectedInternship && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInternship(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-[#FDF8F2] px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-2 shadow-sm border border-slate-100">
                    <img src={selectedInternship.logo} alt="Logo" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#2D1B1B]">Intern | {selectedInternship.companyName} | Portfolio Company</h2>
                    <p className="text-sm font-medium text-[#6C5E5B]">By Andhra University Incubation Council</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedInternship(null)}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="max-h-[70vh] overflow-y-auto px-6 py-6 text-sm text-[#4A3F3D] leading-relaxed">
                {selectedInternship.detailedInfo ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F59E42]">
                      <Calendar className="h-4 w-4" />
                      {selectedInternship.detailedInfo.date}
                    </div>
                    
                    <p>{selectedInternship.detailedInfo.description}</p>
                    
                    <div>
                      <h3 className="text-base font-bold text-[#2D1B1B] mb-2">Responsibilities:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {selectedInternship.detailedInfo.responsibilities.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-[#2D1B1B] mb-2">Required Skills & Qualifications:</h3>
                      <h4 className="font-semibold mt-2 mb-1">Skills:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {selectedInternship.detailedInfo.skills.map((skill, i) => (
                          <li key={i}>{skill}</li>
                        ))}
                      </ul>
                      
                      <h4 className="font-semibold mt-4 mb-1">General Prerequisites:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {selectedInternship.detailedInfo.prerequisites.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    {selectedInternship.detailedInfo.benefits && (
                      <div>
                        <h3 className="text-base font-bold text-[#2D1B1B] mb-2">Benefits:</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {selectedInternship.detailedInfo.benefits.map((benefit, i) => (
                            <li key={i}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <h3 className="text-base font-bold text-[#2D1B1B] mb-2">Application Process:</h3>
                      <p>{selectedInternship.detailedInfo.process}</p>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center text-slate-500">
                    <p className="mb-4 text-lg font-medium text-[#2D1B1B]">More details coming soon!</p>
                    <p>Contact us for more information about the {selectedInternship.role} position at {selectedInternship.companyName}.</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
                <button
                  onClick={() => setSelectedInternship(null)}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleApplyClick(selectedInternship);
                    setSelectedInternship(null);
                  }}
                  className="rounded-lg bg-[#F59E42] px-6 py-2 text-sm font-bold text-white shadow-sm hover:bg-[#E08D38] transition-colors"
                >
                  Apply Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
