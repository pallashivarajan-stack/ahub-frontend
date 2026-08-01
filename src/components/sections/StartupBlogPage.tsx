import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Calendar, Mail, FileText, Users, Building2, X, ExternalLink } from "lucide-react";
import {
  blogTopics,
  startupJourneys,
  latestInsights,
  blogImages,
  type BlogTopic,
  type StartupJourney,
  type Article,
} from "@/data/startupBlog";
import { resolveLegacyAsset } from "@/lib/assets";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export function StartupBlogPage() {
  return (
    <section className="bg-[#F8F4EE] pb-24 text-[#1F2937]">
      <div className="site-container-wide">
        <HeroSection />
        <BrowseByTopic />
        <StartupJourneys />
        <LatestInsights />
        <AhubStartupRoadmap />
      </div>
    </section>
  );
}

function HeroSection() {
  return (
    <div className="pt-20 lg:pt-28 pb-16 lg:pb-24 grid gap-12 lg:grid-cols-2 items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl"
      >
        <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#1F2937] mb-6">
          INSIGHTS
        </div>
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
          <span className="text-[#1F2937]">Startup</span> <span className="text-[#F97316]">Blog</span>
        </h1>
        <p className="text-[17px] leading-relaxed text-[#4B5563] mb-12 max-w-lg font-medium">
          Real startup stories, founder experiences, practical insights, and ecosystem knowledge directly from the AHUB Startup Space. Discover the operational playbooks, scaling strategies, and candid leadership lessons from founders who are building the next generation of category-defining companies.
        </p>
        
        <div className="flex flex-wrap items-center gap-6 sm:gap-10 border-t border-[#E5E7EB] pt-8">
          <Stat item={{ value: "120+", label: "Articles", icon: <FileText className="h-7 w-7 text-[#F97316]" /> }} />
          <Stat item={{ value: "50+", label: "Founders", icon: <Users className="h-7 w-7 text-[#F97316]" /> }} />
          <Stat item={{ value: "20+", label: "Startup Stories", icon: <Building2 className="h-7 w-7 text-[#F97316]" /> }} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative"
      >
        <div className="aspect-[4/3] w-full overflow-hidden rounded-[18px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]">
          <img
            src={resolveLegacyAsset(blogImages.hero)}
            alt="Editorial startup workspace"
            className="h-full w-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}

function Stat({ item }: { item: { value: string; label: string; icon: React.ReactNode } }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-xl shadow-sm">
        {item.icon}
      </div>
      <div>
        <div className="text-xl font-bold text-[#1F2937]">{item.value}</div>
        <div className="text-sm font-medium text-[#6B7280]">{item.label}</div>
      </div>
    </div>
  );
}

function BrowseByTopic() {
  return (
    <motion.div {...fadeUp} className="py-16">
      <h2 className="text-2xl font-bold text-[#1F2937] mb-8">Browse by Topic</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {blogTopics.map((topic, i) => (
          <TopicCard key={topic.id} topic={topic} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

function TopicCard({ topic, index }: { topic: BlogTopic; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group flex flex-col rounded-[18px] border border-transparent bg-white p-6 shadow-sm transition-all duration-250 ease-out hover:-translate-y-[6px] hover:border-[#F97316] hover:shadow-[0_12px_24px_-8px_rgba(249,115,22,0.15)] cursor-pointer"
    >
      <topic.icon 
        className="mb-4 h-8 w-8 text-[#9CA3AF] transition-colors duration-250 group-hover:text-[#F97316]" 
        strokeWidth={1.5} 
      />
      <h3 className="mb-2 text-[15px] font-bold text-[#1F2937]">{topic.title}</h3>
      <p className="mb-4 text-[13px] leading-relaxed text-[#6B7280]">{topic.description}</p>
      <div className="mt-auto">
        <ArrowRight className="h-4 w-4 text-[#9CA3AF] transition-colors duration-250 group-hover:text-[#F97316]" />
      </div>
    </motion.div>
  );
}

function StartupJourneys() {
  const [selectedJourney, setSelectedJourney] = useState<StartupJourney | null>(null);

  return (
    <motion.div {...fadeUp} className="py-16 lg:py-20">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1F2937]">Journeys from Our Startups</h2>
        <Link to="/startups/blog" className="group flex items-center gap-2 text-sm font-semibold text-[#F97316] transition-opacity hover:opacity-80">
          View all stories <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {startupJourneys.map((journey, i) => (
          <JourneyCard key={journey.id} journey={journey} index={i} onClick={() => setSelectedJourney(journey)} />
        ))}
      </div>

      <AnimatePresence>
        {selectedJourney && (
          <JourneyDialog journey={selectedJourney} onClose={() => setSelectedJourney(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function JourneyCard({ journey, index, onClick }: { journey: StartupJourney; index: number; onClick: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={onClick}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-[18px] bg-white shadow-sm transition-all duration-250 hover:-translate-y-[6px] hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.1)]"
    >
      <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-[#F3F4F6]">
        <div className="w-48 sm:w-64 p-4">
          <img src={resolveLegacyAsset(journey.logo)} alt={journey.startupName} className="h-full w-full object-contain drop-shadow-sm" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="mb-6 flex-1 text-[14px] leading-relaxed text-[#4B5563]">{journey.description}</p>
        <div className="flex items-center justify-between text-xs font-medium text-[#6B7280]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{journey.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{journey.readTime}</span>
          </div>
          <ArrowRight className="h-4 w-4 text-[#9CA3AF] transition-colors group-hover:text-[#F97316]" />
        </div>
      </div>
    </motion.article>
  );
}

function JourneyDialog({ journey, onClose }: { journey: StartupJourney; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative z-10 flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-[24px] bg-[#F8F4EE] shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#E5E7EB] text-[#4B5563] transition-colors hover:bg-[#D1D5DB]"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center gap-6 border-b border-[#E5E7EB] bg-white p-8 pt-12 sm:flex-row sm:items-start sm:p-12">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-[#F8F4EE] bg-[#F3F4F6] shadow-sm sm:h-32 sm:w-32">
            <img src={resolveLegacyAsset(journey.founderImage)} alt="Founder" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="mb-4 h-12">
              <img src={resolveLegacyAsset(journey.logo)} alt={journey.startupName} className="h-full w-full object-contain" />
            </div>
            <h2 className="text-2xl font-bold text-[#1F2937] sm:text-3xl">{journey.title}</h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-12">
          <div className="mb-10 text-base leading-relaxed text-[#4B5563] sm:text-lg space-y-4">
            <p>{journey.description}</p>
            <p>
              This detailed breakdown highlights the core strategies, pivots, and milestones that defined the {journey.startupName} journey. By focusing on relentless execution and leveraging the ecosystem, the founding team was able to navigate early challenges and establish a strong market presence.
            </p>
          </div>

          <h3 className="mb-8 text-xl font-bold text-[#1F2937]">The Journey Roadmap</h3>
          <div className="relative mb-8 space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#F97316]/30 before:to-transparent">
            {journey.roadmap.map((step, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#F8F4EE] bg-[#F97316] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <span className="text-xs font-bold">{idx + 1}</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-white shadow-sm border border-[#E5E7EB]">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-[#1F2937]">{step.title}</h4>
                    <span className="text-xs font-semibold text-[#F97316] bg-[#FFF7ED] px-2 py-1 rounded-full">{step.phase}</span>
                  </div>
                  <p className="text-sm text-[#6B7280]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href={journey.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#F97316] px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-1 hover:bg-[#EA580C] hover:shadow-lg"
            >
              Visit {journey.startupName} <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function LatestInsights() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <motion.div {...fadeUp} className="py-16">
      <h2 className="text-2xl font-bold text-[#1F2937] mb-8">Latest Insights</h2>
      <div className="flex flex-col gap-4">
        {latestInsights.map((article, i) => (
          <InsightRow key={article.id} article={article} index={i} onClick={() => setSelectedArticle(article)} />
        ))}
      </div>

      <AnimatePresence>
        {selectedArticle && (
          <ArticleDialog article={selectedArticle} onClose={() => setSelectedArticle(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function InsightRow({ article, index, onClick }: { article: Article; index: number; onClick: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={onClick}
      className="group flex cursor-pointer flex-col gap-4 rounded-[12px] p-2 transition-colors hover:bg-white sm:flex-row sm:items-center sm:gap-6"
    >
      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[12px] bg-white shadow-sm border border-[#E5E7EB] transition-colors group-hover:border-[#F97316]/30">
        <img
          src={resolveLegacyAsset(article.image)}
          alt={article.title}
          className="h-10 w-10 object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="flex-1">
        <h3 className="text-base font-bold text-[#1F2937] group-hover:text-[#F97316] transition-colors">{article.title}</h3>
        <p className="mt-1 text-[13px] text-[#6B7280]">{article.description}</p>
        <div className="mt-3 flex items-center gap-4 text-[12px] font-medium text-[#9CA3AF]">
          <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{article.date}</span>
          <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{article.readTime}</span>
        </div>
      </div>

      <div className="hidden sm:block">
        <span className="inline-flex rounded-full bg-[#FFF7ED] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#F97316]">
          {article.category}
        </span>
      </div>
    </motion.article>
  );
}

function ArticleDialog({ article, onClose }: { article: Article; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative z-10 flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-[24px] bg-[#F8F4EE] shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#E5E7EB] text-[#4B5563] transition-colors hover:bg-[#D1D5DB]"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center gap-6 border-b border-[#E5E7EB] bg-white p-8 pt-12 sm:flex-row sm:items-start sm:p-10">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-[#FFF7ED] border border-[#F97316]/20">
            <img src={resolveLegacyAsset(article.image)} alt="Icon" className="h-12 w-12 object-contain drop-shadow-sm" />
          </div>
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <span className="mb-2 inline-flex rounded-full bg-[#FFF7ED] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#F97316]">
              {article.category}
            </span>
            <h2 className="text-xl font-bold text-[#1F2937] sm:text-2xl">{article.title}</h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-10">
          <div className="mb-8 text-base leading-relaxed text-[#4B5563]">
            <p>{article.dialogContent?.description}</p>
          </div>
          
          {article.dialogContent?.steps && (
            <div className="space-y-6">
              {article.dialogContent.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF7ED] text-sm font-bold text-[#F97316]">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="mb-1 font-bold text-[#1F2937]">{step.title}</h4>
                    <p className="text-sm leading-relaxed text-[#4B5563]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function AhubStartupRoadmap() {
  const steps = [
    { num: "01", title: "Idea Validation", desc: "Submit your idea and get it evaluated by our expert panel of mentors and industry veterans." },
    { num: "02", title: "The Pitch", desc: "Refine your business model and pitch it to the AHUB selection committee to secure incubation." },
    { num: "03", title: "Incubation", desc: "Move into our collaborative workspace, get access to IoT labs, funding, and a dedicated mentor." },
    { num: "04", title: "Scale & Launch", desc: "Leverage our investor network and ecosystem partners to scale your product and go to market." },
  ];

  return (
    <motion.div {...fadeUp} className="py-16">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-extrabold text-[#1F2937] mb-4">How to Start a Startup at AHUB</h2>
        <p className="text-[#4B5563] max-w-2xl mx-auto">The structured roadmap to turn your idea into a thriving business within our ecosystem.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-4 relative">
        <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-[#F97316]/30 to-transparent -z-10" />
        
        {steps.map((step, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-16 h-16 rounded-full bg-white border-4 border-[#F8F4EE] shadow-sm flex items-center justify-center text-xl font-black text-[#F97316] mb-6 group-hover:scale-110 transition-transform duration-300">
              {step.num}
            </div>
            <h3 className="text-lg font-bold text-[#1F2937] mb-3">{step.title}</h3>
            <p className="text-sm text-[#6B7280] leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
