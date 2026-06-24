import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import {
  blogImages,
  featuredPosts,
  journeyTimeline,
  wideFeaturedPosts,
  type BlogPost,
  type TimelineStep,
} from "@/data/startupBlog";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export function StartupBlogPage() {
  return (
    <section className="relative isolate overflow-hidden bg-[#FFF7ED] pb-24 pt-28 md:pb-32 md:pt-32 lg:pt-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_90%_5%,rgba(249,115,22,0.08),transparent_55%),radial-gradient(50%_45%_at_5%_20%,rgba(249,115,22,0.06),transparent_50%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <BlogHero />
        <BlogCardsGrid />
        <StartupJourneyTimeline />
      </div>
    </section>
  );
}

function BlogHero() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[#F97316]/25 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F97316]">
          <BookOpen className="h-3.5 w-3.5" />
          Insights
        </div>
        <h1 className="mt-5 font-display text-4xl font-[800] tracking-tight text-[#1C1917] sm:text-5xl lg:text-[56px]">
          Startup Blog
        </h1>
      </motion.div>

      <motion.div
        {...fadeUp}
        className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
      >
        <div className="overflow-hidden rounded-2xl shadow-[0_20px_60px_-30px_rgba(28,25,23,0.18)]">
          <img
            src={blogImages.hero}
            alt="Startup team collaborating at AHUB"
            className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
          />
        </div>

        <div>
          <h2 className="text-2xl font-[800] leading-tight text-[#F97316] md:text-3xl">
            Insights for Founders Building Inside the Ecosystem
          </h2>
          <p className="mt-3 text-sm font-medium text-[#78716C] md:text-base">
            Stories, strategies, and practical guidance from the AHUB incubation community.
          </p>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#44403C] md:text-[15px]">
            <p>
              The AHUB Startup Blog captures the momentum of founders, mentors, and investors shaping the next
              generation of ventures. From ideation to funding, we share what works inside a premium incubation
              environment built for serious builders.
            </p>
            <p>
              Explore frameworks on product development, go-to-market strategy, fundraising readiness, and
              ecosystem collaboration — written for founders who want investor-grade clarity without the noise.
            </p>
            <p>
              Whether you are validating your first idea or preparing for your next round, these insights reflect
              real journeys from coworking floors, innovation labs, and demo day stages across our network.
            </p>
            <p>
              Stay close to the conversations that matter: mentorship, capital access, institutional partnerships,
              and the operational discipline that turns ambition into durable companies.
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}

function BlogCardsGrid() {
  return (
    <motion.div {...fadeUp} className="mt-20 lg:mt-24">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featuredPosts.map((post, index) => (
          <SmallBlogCard key={post.id} post={post} index={index} />
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {wideFeaturedPosts.map((post, index) => (
          <WideBlogCard key={post.id} post={post} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

function SmallBlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_-24px_rgba(28,25,23,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(249,115,22,0.18)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: post.imagePosition ?? "center" }}
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-sm font-[800] leading-snug text-[#1C1917] md:text-[15px]">{post.title}</h3>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-xs text-[#78716C]">{post.readTime}</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF7ED] text-[#F97316] transition-colors group-hover:bg-[#F97316] group-hover:text-white">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function WideBlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_-24px_rgba(28,25,23,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(249,115,22,0.18)] sm:flex-row"
    >
      <div className="relative aspect-[16/10] overflow-hidden sm:aspect-auto sm:w-[45%]">
        <img
          src={post.image}
          alt={post.title}
          className="h-full min-h-[180px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: post.imagePosition ?? "center" }}
        />
      </div>

      <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
        <h3 className="text-lg font-[800] leading-tight text-[#1C1917] md:text-xl">{post.title}</h3>
        {post.description ? (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#78716C]">{post.description}</p>
        ) : null}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs text-[#78716C]">{post.readTime}</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF7ED] text-[#F97316] transition-colors group-hover:bg-[#F97316] group-hover:text-white">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function StartupJourneyTimeline() {
  return (
    <motion.div {...fadeUp} className="mt-20 lg:mt-28">
      <h2 className="text-center text-2xl font-[800] text-[#1C1917] md:text-3xl">Startup Journey Timeline</h2>
      <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#F97316]" />

      <div className="relative mt-12">
        <div className="pointer-events-none absolute left-[10%] right-[10%] top-[88px] hidden h-px bg-gradient-to-r from-transparent via-[#F97316]/40 to-transparent lg:block" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {journeyTimeline.map((step, index) => (
            <TimelineCard key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function TimelineCard({ step, index }: { step: TimelineStep; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_-24px_rgba(28,25,23,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(249,115,22,0.15)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={step.image}
          alt={step.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: step.imagePosition ?? "center" }}
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-[800] text-[#1C1917]">{step.title}</h3>
        <p className="mt-2 flex-1 text-xs leading-relaxed text-[#78716C] md:text-sm">{step.description}</p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-[#FFF7ED] px-3 py-1 text-[11px] font-bold text-[#F97316]">
            {step.date}
          </span>
          <Link
            to="/startups/startup-portfolio"
            className="rounded-full bg-[#F97316] px-4 py-1.5 text-[11px] font-semibold text-white transition-all hover:bg-[#EA580C]"
          >
            Explore
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
