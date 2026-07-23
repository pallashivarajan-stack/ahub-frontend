import { useState } from "react";
import { LazyMotion, m as motion, domAnimation } from "framer-motion";
import { Search, FileText, Download, ArrowRight } from "lucide-react";
import { resolveLegacyAsset } from "@/lib/assets";
import { usePublicReports } from "@/services/usePublicContent";

const AUIC_REPORTS = [
  {
    title: "Incubation Business Plan",
    subtitle: "AUIC Incubation Hub",
    description: "Strategic framework, operational guidelines, and long-term vision for scaling the incubation hub.",
    pages: 35,
    size: "4.5 MB",
    image: resolveLegacyAsset("/src/assets/reports/business plan for a-hub.png"),
    downloadFile: resolveLegacyAsset("/src/assets/reports/BUSINESS PLANOF A-HUB.pdf"),
  },
  {
    title: "Funding Report 2025",
    subtitle: "AUIC Incubation Hub",
    description: "Detailed analysis of startup funding, investment trends, and financial milestones across the hub.",
    pages: 28,
    size: "3.2 MB",
    image: resolveLegacyAsset("/src/assets/reports/funding report.png"),
    downloadFile: resolveLegacyAsset("/src/assets/reports/FUNDING REPORT.pdf"),
  },
  {
    title: "Vizag Startup Ecosystem",
    subtitle: "AUIC Incubation Hub",
    description: "An overview of the thriving Vizag startup ecosystem, growth metrics, and community impact.",
    pages: 42,
    size: "6.8 MB",
    image: resolveLegacyAsset("/src/assets/reports/vizag startup ecosystem.png"),
    downloadFile: resolveLegacyAsset("/src/assets/reports/VIZAG IIM INTERN.pdf"),
  },
];

const STARTUP_REPORTS = [
  {
    title: "Akshaya Aerospace Report",
    subtitle: "Akshaya Aerospace Technology",
    description: "Detailed insights into aerospace technology advancements, innovation, and key milestones achieved.",
    pages: 18,
    size: "0.9 MB",
    image: resolveLegacyAsset("/src/assets/reports/akshaya_aerospace.png"),
    downloadFile: resolveLegacyAsset("/src/assets/reports/Akshaya Aerospace Technology Private Limited.pdf"),
  },
  {
    title: "BA Infotech Growth Report",
    subtitle: "BA Infotech Private Limited",
    description: "Comprehensive growth analysis covering IT services, software development, and scaling strategies.",
    pages: 22,
    size: "0.8 MB",
    image: resolveLegacyAsset("/src/assets/reports/ba_infotech.png"),
    downloadFile: resolveLegacyAsset("/src/assets/reports/BA Infotech Private Limited.pdf"),
  },
  {
    title: "Joora Drones Annual Report",
    subtitle: "Joora Drones",
    description: "Annual review of drone manufacturing, hardware innovation, and market expansion strategies.",
    pages: 20,
    size: "0.8 MB",
    image: resolveLegacyAsset("/src/assets/reports/joora_drones.png"),
    downloadFile: resolveLegacyAsset("/src/assets/reports/JOORA DRONES.pdf"),
  },
];

export function ReportsPage() {
  const { data: reportsData } = usePublicReports(null);

  const startupReports = reportsData?.startupReports ?? STARTUP_REPORTS;
  const ahubReports = reportsData?.ahubReports ?? AUIC_REPORTS;

  const [activeTab, setActiveTab] = useState("All Reports");
  
  const tabs = ["All Reports", "Startup Reports", "AHUB Reports"];

  return (
    <LazyMotion features={domAnimation}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');`}</style>
      <div 
        className="w-full bg-[#FDF8F2] pt-24 pb-24 px-6 md:px-12"
        style={{ fontFamily: "'Manrope', 'Helvetica Neue', sans-serif" }}
      >
        <div className="mx-auto max-w-[1200px]">
          
          {/* HEADER SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F59E42]/25 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F59E42] shadow-sm backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F59E42]" />
              Reports
            </div>
            
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-[#2D1B1B] sm:text-4xl md:text-5xl">
              Insights that drive <span className="text-[#F59E42]">innovation.</span>
            </h1>
            
            <p className="mx-auto mt-4 max-w-xl text-base text-[#6C5E5B]">
              Explore reports from our startups and AHUB. Built with transparency. Shared for impact.
            </p>
            
            <div className="mt-5 h-1 w-16 rounded-full bg-[#F59E42]" />
          </motion.div>

          {/* STARTUP REPORTS SECTION */}
          {(activeTab === "All Reports" || activeTab === "Startup Reports") && (
            <div className="mb-20">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <h2 className="text-[32px] font-bold tracking-tight text-[#1B1B1B]">Startup Reports</h2>
                  <div className="h-px w-16 bg-[#F59E42] hidden sm:block" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {startupReports.map((report, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-white rounded-[24px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col group hover:shadow-[0_16px_50px_rgba(0,0,0,0.08)] transition-all duration-300"
                  >
                    <div className="relative h-[220px] w-full overflow-hidden bg-gray-100">
                      <img 
                        src={report.image} 
                        alt={report.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 shadow-sm">
                        <FileText className="h-3.5 w-3.5 text-[#F59E42]" />
                        <span className="text-[11px] font-bold text-gray-800">PDF</span>
                      </div>
                      <a 
                        href={report.downloadFile} 
                        download
                        className="absolute bottom-4 right-4 h-10 w-10 bg-[#F59E42] rounded-full flex items-center justify-center text-white shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#e8902e]"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-[20px] font-bold text-[#1B1B1B] leading-tight mb-1">{report.title}</h3>
                      <p className="text-[14px] font-medium text-gray-500 mb-4">{report.subtitle}</p>
                      
                      <div className="mb-6 mt-auto">
                        <p className="text-[14px] text-gray-600 leading-[1.5]">{report.description}</p>
                      </div>
                      
                      <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-4 text-[12px] font-semibold text-gray-500">
                          <span>{report.pages} Pages</span>
                          <div className="flex items-center gap-1">
                            <FileText className="h-3 w-3" /> PDF
                          </div>
                          <span>{report.size}</span>
                        </div>
                        <a 
                          href={report.downloadFile}
                          download
                          className="text-[13px] font-bold text-[#F59E42] flex items-center gap-1 hover:gap-1.5 transition-all"
                        >
                          Download <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* AHUB REPORTS SECTION */}
          {(activeTab === "All Reports" || activeTab === "AHUB Reports") && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <h2 className="text-[32px] font-bold tracking-tight text-[#1B1B1B]">AHUB Reports</h2>
                  <div className="h-px w-16 bg-[#F59E42] hidden sm:block" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ahubReports.map((report, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-white rounded-[24px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col group hover:shadow-[0_16px_50px_rgba(0,0,0,0.08)] transition-all duration-300"
                  >
                    <div className="relative h-[220px] w-full overflow-hidden bg-gray-100">
                      <img 
                        src={report.image} 
                        alt={report.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 shadow-sm">
                        <FileText className="h-3.5 w-3.5 text-[#F59E42]" />
                        <span className="text-[11px] font-bold text-gray-800">PDF</span>
                      </div>
                      <a 
                        href={report.downloadFile} 
                        download
                        className="absolute bottom-4 right-4 h-10 w-10 bg-[#1B1B1B] rounded-full flex items-center justify-center text-white shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-black"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-[20px] font-bold text-[#1B1B1B] leading-tight mb-1">{report.title}</h3>
                      <p className="text-[14px] font-medium text-gray-500 mb-4">{report.subtitle}</p>
                      
                      <div className="mb-6 mt-auto">
                        <p className="text-[14px] text-gray-600 leading-[1.5]">{report.description}</p>
                      </div>
                      
                      <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-4 text-[12px] font-semibold text-gray-500">
                          <span>{report.pages} Pages</span>
                          <div className="flex items-center gap-1">
                            <FileText className="h-3 w-3" /> PDF
                          </div>
                          <span>{report.size}</span>
                        </div>
                        <a 
                          href={report.downloadFile}
                          download
                          className="text-[13px] font-bold text-[#1B1B1B] flex items-center gap-1 hover:gap-1.5 transition-all"
                        >
                          Download <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {/* CONTACT BANNER */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-[#FDF4EA] rounded-[24px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#F59E42]/20"
          >
            <div className="flex items-center gap-4 md:gap-6">
              <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                <Search className="h-6 w-6 text-[#F59E42]" />
              </div>
              <div>
                <h4 className="text-[18px] font-bold text-[#1B1B1B] mb-1">Can't find the report you're looking for?</h4>
                <p className="text-[15px] text-gray-600">Contact our team and we'll help you find the information you need.</p>
              </div>
            </div>
            <a href="/#lets-connect" className="whitespace-nowrap px-6 py-3 rounded-full border border-[#F59E42] text-[#F59E42] font-bold text-[14px] hover:bg-[#F59E42] hover:text-white transition-colors shrink-0">
              Let's Connect &rarr;
            </a>
          </motion.div>

        </div>
      </div>
    </LazyMotion>
  );
}