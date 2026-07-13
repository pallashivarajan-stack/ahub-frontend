import { SectionHeading } from "@/components/ui-ahub/SectionHeading";
import { usePublicPartners } from "@/services/usePublicContent";
import { resolveLegacyAsset } from "@/lib/assets";

const legacyPaths = [
  "/src/assets/partners/alcove.jpg",
  "/src/assets/partners/atpi.jpg",
  "/src/assets/partners/avanti.png",
  "/src/assets/partners/digifac.png",
  "/src/assets/partners/icompass.png",
  "/src/assets/partners/ministry of sceince.png",
  "/src/assets/partners/nasscom.png",
  "/src/assets/partners/rosys.jpg",
  "/src/assets/partners/sandlogic.jpg",
  "/src/assets/partners/tie.jpg",
];

const partnerFallback = legacyPaths.map(resolveLegacyAsset);

export function Partners() {
  const { data: partnerLogosData } = usePublicPartners(partnerFallback);
  const row1 = partnerLogosData;
  const row2 = [...partnerLogosData].reverse();

  const loop1 = [...row1, ...row1];
  const loop2 = [...row2, ...row2];

  return (
    <section id="associate" className="relative overflow-hidden py-16 md:py-24">
      <div className="site-container-wide text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F59E42]">
            <span className="h-px w-8 bg-[#F59E42]" />
            Associated With
            <span className="h-px w-8 bg-[#F59E42]" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[3rem] font-bold leading-[1.15] tracking-tight text-[#1B1B1B]">
            Backed by builders,
            <br />
            funds and <span className="text-[#F59E42]">institutions.</span>
          </h2>
        </div>

      <div className="marquee-container mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-14 px-6">
          {loop1.map((logo, i) => (
            <div
              key={i}
              className="grid h-20 min-w-[180px] place-items-center transition-all duration-500"
            >
              <img src={logo} alt="Partner Logo" className="max-h-16 max-w-[160px] object-contain" />
            </div>
          ))}
        </div>
      </div>

      <div className="marquee-container mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max animate-marquee-slow items-center gap-14 px-6" style={{ animationDirection: "reverse" }}>
          {loop2.map((logo, i) => (
            <div
              key={i}
              className="grid h-20 min-w-[180px] place-items-center transition-all duration-500"
            >
              <img src={logo} alt="Partner Logo" className="max-h-16 max-w-[160px] object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
