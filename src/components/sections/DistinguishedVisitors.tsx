import { SectionHeading } from "@/components/ui-ahub/SectionHeading";
import { usePublicDistinguishedVisitors } from "@/services/usePublicContent";
import { resolveLegacyAsset } from "@/lib/assets";

export function DistinguishedVisitors() {
  const visitorsFallback = [
    {
      name: "BVR Mohan Reddy",
      role: "Chairman",
      org: "Cyient",
      image: resolveLegacyAsset("/src/assets/visitors/bvr mohan reddy.jpeg"),
    },
    {
      name: "Rishi Mehta",
      role: "Chief Executive Officer",
      org: "WAISL",
      image: resolveLegacyAsset("/src/assets/visitors/rishi mehta.jpg"),
    },
    {
      name: "Mats Viberg",
      role: "Vice Chancellor",
      org: "Blekinge Institute of Technology",
      image: resolveLegacyAsset("/src/assets/visitors/mats viberg.jpeg"),
    },
    {
      name: "Malcolm Byrne",
      role: "Senator",
      org: "Senate of Ireland",
      image: resolveLegacyAsset("/src/assets/visitors/malcolm Byrne.jpg"),
    },
    {
      name: "Dr Lawrence Jones",
      role: "Programme Director",
      org: "Wageningen University",
      image: resolveLegacyAsset("/src/assets/visitors/dr lawrence jones.jpeg"),
    },
    {
      name: "N. R. Narayana Murthy",
      role: "Founder & Former CEO",
      org: "Infosys",
      image: resolveLegacyAsset("/src/assets/visitors/naryana murthy.png"),
    },
    {
      name: "G. Malikarjuna Rao",
      role: "Chairman",
      org: "GMR Group",
      image: resolveLegacyAsset("/src/assets/visitors/G malikarjuna rao.jpg"),
    },
    {
      name: "Carmelo Rosa",
      role: "Director",
      org: "UD FDA",
      image: resolveLegacyAsset("/src/assets/visitors/carmelo rosa.jpg"),
    },
  ];

  const { data: visitors } = usePublicDistinguishedVisitors(visitorsFallback);

  const loop = [...visitors, ...visitors];

  return (
    <section
      data-animate
      id="distinguished-visitors"
      className="relative isolate overflow-hidden bg-white py-16 text-foreground md:py-24"
      style={{
        backgroundImage:
          "linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(255,244,234,0.78)_22%,rgba(255,229,204,0.58)_62%,rgba(255,255,255,0.95)_100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-90"
        style={{ backgroundImage: `url(${resolveLegacyAsset("/src/assets/orange  visitors background.png")})` }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_55%_at_50%_0%,rgba(255,255,255,0.38),transparent_58%),linear-gradient(180deg,rgba(255,255,255,0.42),rgba(255,255,255,0.12))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(255,246,238,0.96))]" />
      <div className="pointer-events-none absolute -bottom-14 left-1/2 h-36 w-[68%] -translate-x-1/2 rounded-full bg-[rgba(255,214,180,0.38)] blur-3xl" />

      <div className="site-container-wide text-center">
        <SectionHeading
          eyebrow="OUR DISTINGUISHED VISITORS"
          title="Visionaries Driving Innovation"
          subtitle="Leaders from policy, capital, and craft who have walked the floor, met the founders, and shared their counsel."
          align="center"
        />
      </div>

      {/* Constrained Marquee Container with custom border styling and hover pause */}
      <div className="marquee-container relative mt-10 overflow-hidden group/marquee">
        <div
          className="flex w-max gap-5 px-6 md:px-10 animate-marquee items-center group-hover/marquee:[animation-play-state:paused]"
          style={{ willChange: "transform" }}
        >
          {loop.map((v, i) => (
            <article
              key={i}
              className="group/card flex w-[clamp(220px,35vw,290px)] shrink-0 flex-col overflow-hidden rounded-[24px] border border-[color:color-mix(in_oklch,var(--primary)_8%,transparent)] bg-[color:color-mix(in_oklch,var(--card)_96%,white)] shadow-[0_18px_48px_-30px_rgba(90,30,44,0.28)] transition-all duration-500 hover:-translate-y-[6px] hover:shadow-[0_28px_60px_-24px_rgba(90,30,44,0.36)] flex-shrink-0"
              style={{ willChange: "transform" }}
            >
              <div className="flex items-start gap-3.5 p-4">
                <img
                  src={v.image}
                  alt={v.name}
                  loading="lazy"
                  draggable={false}
                  className="h-16 w-16 shrink-0 rounded-[16px] object-cover ring-2 ring-orange-100/50"
                />

                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="inline-flex items-center rounded-full border border-[color:color-mix(in_oklch,var(--primary)_10%,transparent)] bg-[color-mix(in_oklch,var(--background)_90%,white)] px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.15em] text-primary/85 leading-none">
                    Visitor
                  </div>

                  <h3 className="mt-2.5 text-[0.95rem] font-bold leading-tight text-foreground truncate">
                    {v.name}
                  </h3>
                  <p className="mt-0.5 text-[0.75rem] leading-snug text-muted-foreground truncate">{v.role}</p>
                  <p className="text-[0.75rem] leading-snug text-muted-foreground/90 truncate">{v.org}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
