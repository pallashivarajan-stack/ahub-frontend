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
      className="relative overflow-hidden py-10 md:py-14"
    >

      <div className="site-container-wide">
        {/* Header Content */}
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Top Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F59E42]/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#F59E42] shadow-sm backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F59E42]" />
            STARTUPS IN AHUB
          </div>

          {/* Main Heading — reduced size */}
          <h2 className="font-display text-3xl md:text-4xl lg:text-[3rem] font-bold leading-[1.05] tracking-tight">
            <span className="text-[#F59E42]">Successful</span>{" "}
            <span className="text-[#2D1B1B]">
              startups moving<br />through the ecosystem
            </span>
          </h2>


        </div>

        {/* Marquee Section — no background, no arrows, clean like portfolio page */}
        <div className="marquee-container relative -mx-20 mt-12">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#FFF8F0] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#FFE8D6] to-transparent" />

          <div className="group/marquee overflow-hidden py-4">
            <div className="flex w-max animate-marquee items-center group-hover/marquee:[animation-play-state:paused]" style={{ animationDuration: "65s" }}>
              {marqueeLogos.map((logo, idx) => (
                <div
                  key={idx}
                  className="mx-5 flex h-[110px] w-[190px] shrink-0 items-center justify-center rounded-2xl bg-white px-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border-2 border-dashed border-[#F59E42]/30 transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={logo}
                    alt="Startup Logo"
                    className="max-h-[64px] max-w-[130px] object-contain"
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