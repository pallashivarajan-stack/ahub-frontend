import { usePublicStartupsTicker } from "@/services/usePublicContent";
import { resolveLegacyAsset } from "@/lib/assets";

const legacyPaths = [
  "/src/assets/startups/agri dna.jpg",
  "/src/assets/startups/antar iot.png",
  "/src/assets/startups/austhraa_motors_logo.jpg",
  "/src/assets/startups/billbo.jpg",
  "/src/assets/startups/bizpro.png",
  "/src/assets/startups/cirus.jpg",
  "/src/assets/startups/data foundary.png",
  "/src/assets/startups/der auto bot.jpg",
  "/src/assets/startups/digiotai.jpg",
  "/src/assets/startups/edumoon.png",
  "/src/assets/startups/furpsq.jpg",
  "/src/assets/startups/greenjams_logo.jpg",
  "/src/assets/startups/happy drivers.jpg",
  "/src/assets/startups/house insta.png",
  "/src/assets/startups/icompass.png",
  "/src/assets/startups/innoccito.jpg",
  "/src/assets/startups/interview buddy.png",
  "/src/assets/startups/ipmg.jpg",
  "/src/assets/startups/jaitra.jpg",
  "/src/assets/startups/jnana.jpg",
  "/src/assets/startups/joora_drone_consultants_logo.jpg",
  "/src/assets/startups/matric services.png",
  "/src/assets/startups/nest webhost.png",
  "/src/assets/startups/nr techcreatz.png",
  "/src/assets/startups/pick a book.png",
  "/src/assets/startups/retruntrucks_logo.jpg",
  "/src/assets/startups/rolls mama.jpg",
  "/src/assets/startups/sandlogic.png",
  "/src/assets/startups/schemax.png",
  "/src/assets/startups/sconex.jpg",
  "/src/assets/startups/spice route.jpg",
  "/src/assets/startups/spot times.png",
  "/src/assets/startups/starbeat.jpg",
  "/src/assets/startups/starry stories.png",
  "/src/assets/startups/sweya.png",
  "/src/assets/startups/talentspotify_logo.jpg",
  "/src/assets/startups/taramandal.jpg",
  "/src/assets/startups/tessrac_logo.jpg",
  "/src/assets/startups/train dhaba.avif",
  "/src/assets/startups/vihaan.jpg",
  "/src/assets/startups/vyomastra.jpg",
];

const logos = legacyPaths.map(resolveLegacyAsset);

export function StartupsTicker() {
  const { data: startupLogosData } = usePublicStartupsTicker(logos);
  // Duplicate for smooth infinite scroll
  const marqueeLogos = [...startupLogosData, ...startupLogosData];

  return (
    <section
      id="startups-in-ahub"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#FFF8F0_0%,#FFE8D6_100%)] py-16 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,140,50,0.08),transparent_60%)]" />

      <div className="site-container-wide">
        {/* Header Content */}
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Top Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F59E42]/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#F59E42] shadow-sm backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F59E42]" />
            STARTUPS IN AHUB
          </div>

          {/* Main Heading — reduced size */}
          <h2 className="font-display text-4xl font-[800] leading-[1.05] tracking-tight md:text-5xl lg:text-[3.5rem]">
            <span className="text-[#F59E42]">Successful</span>{" "}
            <span className="text-[#2D1B1B]">
              startups moving<br />through the ecosystem
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-[700px] text-sm leading-relaxed text-[#6C5E5B] md:text-base">
            A neat marquee of portfolio companies showing the momentum, depth, and investor-grade quality inside AHUB.
          </p>
        </div>

        {/* Marquee Section — no background, no arrows, clean like portfolio page */}
        <div className="marquee-container relative mt-12">
          {/* Fade Edges — blending into the section background, NOT white */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#FFF8F0] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#FFE8D6] to-transparent" />

          <div className="group/marquee overflow-hidden">
            <div className="flex w-max animate-marquee items-center group-hover/marquee:[animation-play-state:paused]">
              {marqueeLogos.map((logo, idx) => (
                <div
                  key={idx}
                  className="flex h-[100px] w-[160px] shrink-0 items-center justify-center px-5"
                >
                  <img
                    src={logo}
                    alt="Startup Logo"
                    className="max-h-[80px] max-w-[130px] object-contain mix-blend-multiply"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}