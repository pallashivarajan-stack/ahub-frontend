import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, Linkedin, Search, Twitter, MessageSquareQuote } from "lucide-react";
import { usePublicSocialLinks } from "@/services/usePublicContent";

const platforms = [
  {
    name: "LinkedIn",
    username: "A-Hub LinkedIn",
    description: "Professional startup ecosystem updates and innovation insights.",
    href: "https://www.linkedin.com",
    icon: Linkedin,
    accent: "from-[#5b0e2d] via-[#8d1d46] to-[#f5d8e0]",
    glow: "bg-[#5b0e2d]/25",
    embed: "https://www.linkedin.com/embed/feed/update/urn:li:share:7478853567030640640",
  },
  {
    name: "Twitter / X",
    username: "A-Hub Twitter",
    description: "Latest announcements, startup news, and ecosystem highlights.",
    href: "https://x.com",
    icon: Twitter,
    accent: "from-slate-900 via-slate-700 to-[#e8edf3]",
    glow: "bg-slate-900/25",
    tweetUrl: "https://twitter.com/ahub1199375/status/2061400902213456017",
  },
  {
    name: "Instagram",
    username: "A-Hub Instagram",
    description: "Behind the scenes, events, founders, and campus innovation moments.",
    href: "https://www.instagram.com",
    icon: Instagram,
    accent: "from-[#5b0e2d] via-[#b53d67] to-[#fdf2f5]",
    glow: "bg-pink-500/20",
    instagramEmbed: "https://www.instagram.com/p/DawhjJgMvvV/",
  },
];

export function FindUsOn() {
  const [cursor, setCursor] = useState({ x: 50, y: 50 });
  const { data: platformsData } = usePublicSocialLinks(platforms);

  useEffect(() => {
    const twitterScript = document.createElement("script");
    twitterScript.src = "https://platform.twitter.com/widgets.js";
    twitterScript.async = true;
    document.body.appendChild(twitterScript);

    const instagramScript = document.createElement("script");
    instagramScript.src = "https://www.instagram.com/embed.js";
    instagramScript.async = true;
    document.body.appendChild(instagramScript);

    return () => {
      document.body.removeChild(twitterScript);
      document.body.removeChild(instagramScript);
    };
  }, []);

  return (
    <section id="social" className="relative isolate overflow-hidden py-10 text-foreground md:py-14">

      <div className="site-container-wide">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#5b0e2d]/12 bg-white/82 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-[#5b0e2d] shadow-[0_10px_30px_-20px_rgba(91,14,45,0.3)] backdrop-blur-md">
            <Search size={12} /> Find Us On
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[3rem] font-bold tracking-tight">
            <span style={{ color: '#F59E42' }}>Find</span>{' '}
            <span style={{ color: '#2D1B1B' }}>Us On</span>
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-[#F59E42]" />
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Connect with our innovation ecosystem across social platforms and discover startup updates, founder stories, campus activities, and ecosystem highlights.
          </p>
        </div>

        <div className="mt-12 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {platformsData.map((platform: any, index: number) => (
            <SocialCard
              key={platform.name}
              platform={platform}
              index={index}
              cursor={cursor}
              setCursor={setCursor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialCard({
  platform,
  index,
  cursor,
  setCursor,
}: {
  platform: any;
  index: number;
  cursor: { x: number; y: number };
  setCursor: (value: { x: number; y: number }) => void;
}) {
  const iconMap: Record<string, any> = {
    Linkedin: Linkedin,
    Twitter: Twitter,
    Instagram: Instagram,
  };
  const Icon = platform.icon || iconMap[platform.iconName] || Search;

  return (
    <motion.div
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest("iframe, blockquote, a")) {
          return;
        }
        window.open(platform.href, "_blank", "noreferrer");
      }}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        setCursor({
          x: ((event.clientX - bounds.left) / bounds.width) * 100,
          y: ((event.clientY - bounds.top) / bounds.height) * 100,
        });
      }}
      className="group relative cursor-pointer overflow-hidden rounded-[24px] border border-[#5b0e2d]/10 bg-white/82 p-6 shadow-[0_24px_80px_-40px_rgba(91,14,45,0.28)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#5b0e2d]/20 hover:shadow-[0_28px_90px_-38px_rgba(91,14,45,0.44)] flex flex-col h-full"
      style={{
        transformOrigin: "center",
      }}
    >
      <div
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${platform.glow}`}
        style={{
          background: `radial-gradient(circle at ${cursor.x}% ${cursor.y}%, rgba(255,255,255,0.9), transparent 38%), radial-gradient(circle at 20% 20%, rgba(91,14,45,0.18), transparent 42%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/50 blur-3xl" />
        <div className="absolute -bottom-10 left-6 h-24 w-24 rounded-full bg-[#5b0e2d]/12 blur-3xl" />
      </div>

      <div className="relative flex items-start justify-between gap-5 flex-1">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5b0e2d]/12 bg-white/85 px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] text-[#5b0e2d]">
            <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${platform.accent}`} />
            {platform.name}
          </div>

          <div className="mt-6 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {platform.username}
          </div>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {platform.description}
          </p>
        </div>

        <div className="relative shrink-0">
          <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${platform.accent} opacity-40 blur-xl transition-all duration-500 group-hover:opacity-70`} />
          <div className={`relative grid h-20 w-20 place-items-center rounded-full border border-white/80 bg-gradient-to-br ${platform.accent} shadow-[0_18px_40px_-16px_rgba(91,14,45,0.45)] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-105`}>
            <div className="absolute inset-[-8px] rounded-full border border-white/30 opacity-70 transition-transform duration-700 group-hover:rotate-45" />
            <div className="absolute inset-[-14px] rounded-full border border-[#5b0e2d]/20 opacity-60 transition-transform duration-700 group-hover:-rotate-12" />
            <Icon size={30} className="text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.55)]" />
          </div>
        </div>
      </div>

      {platform.embed ? (
        <div className="mt-4 mb-2 overflow-y-auto rounded-[11px] border border-[#5b0e2d]/10 shadow-sm max-h-[250px]">
          <iframe
            src={`${platform.embed}?collapsed=1`}
            height="669"
            width="504"
            frameBorder="0"
            allowFullScreen
            title="Embedded post"
            className="w-full"
          />
        </div>
      ) : platform.tweetUrl ? (
        <div className="mt-4 mb-2 overflow-y-auto rounded-[11px] border border-slate-200/50 shadow-sm max-h-[250px]">
          <blockquote className="twitter-tweet" data-theme="light">
            <a href={platform.tweetUrl}></a>
          </blockquote>
        </div>
      ) : platform.instagramEmbed ? (
        <div className="mt-4 mb-2 overflow-y-auto rounded-[11px] border border-pink-100/50 shadow-sm max-h-[250px]">
          <blockquote
            className="instagram-media"
            data-instgrm-captioned
            data-instgrm-permalink={`${platform.instagramEmbed}?utm_source=ig_embed&utm_campaign=loading`}
            data-instgrm-version="14"
          ></blockquote>
        </div>
      ) : (
        <div className="relative opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 mt-4 mb-2">
          <div className="text-xs font-bold text-[#5b0e2d]/80 uppercase tracking-wider mb-1">Latest Community Buzz</div>
          <div className="bg-[#FFF8F3] rounded-[11px] p-[13px] mt-4 relative border border-[#5b0e2d]/5 shadow-sm">
            <MessageSquareQuote size={16} className="text-[#5b0e2d]/40 mb-2" />
            <p className="text-[13px] italic text-[#5b0e2d]/80 leading-relaxed line-clamp-3">
              "{platform.testimonial.quote}"
            </p>
            <div className="mt-2 text-xs font-semibold text-[#5b0e2d]/60">
              — {platform.testimonial.author}
            </div>
          </div>
        </div>
      )}

      <div className="relative mt-auto pt-6 flex items-center justify-between border-t border-[#5b0e2d]/10">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5b0e2d]" />
          Follow the ecosystem
        </div>
        <div className="inline-flex items-center gap-2 text-sm font-medium text-[#5b0e2d] transition-transform duration-300 group-hover:translate-x-1">
          Explore <ArrowUpRight size={15} />
        </div>
      </div>
    </motion.div>
  );
}
