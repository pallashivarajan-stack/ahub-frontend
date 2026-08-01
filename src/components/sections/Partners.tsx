import { SectionHeading } from "@/components/ui-ahub/SectionHeading";
import { usePublicAssociatedWith } from "@/services/usePublicContent";
import { resolveLegacyAsset } from "@/lib/assets";

const legacyPaths = [
  "/src/assets/partners/tie.jpg",
  "/src/assets/partners/alcove.jpg",
  "/src/assets/partners/atpi.jpg",
  "/src/assets/partners/avanti.png",
  "/src/assets/partners/ministry of sceince.png",
  "/src/assets/partners/nasscom.png",
];

const partnerFallback = legacyPaths.map(resolveLegacyAsset);

export function Partners() {
  const { data: partnerLogosData } = usePublicAssociatedWith(partnerFallback);
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

        <div className="marquee-container relative -mx-20 mt-14">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />

          <div className="overflow-hidden py-4">
            <div className="flex w-max animate-marquee items-center">
              {loop1.map((logo, i) => (
                <div
                  key={i}
                  className="mx-4 flex h-[80px] w-[150px] shrink-0 items-center justify-center rounded-2xl bg-white px-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                >
                  <img src={logo} alt="Partner Logo" className="max-h-[64px] max-w-[130px] object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="marquee-container relative -mx-20 mt-8">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />

          <div className="overflow-hidden py-4">
            <div className="flex w-max animate-marquee-slow items-center" style={{ animationDirection: "reverse" }}>
              {loop2.map((logo, i) => (
                <div
                  key={i}
                  className="mx-4 flex h-[80px] w-[150px] shrink-0 items-center justify-center rounded-2xl bg-white px-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                >
                  <img src={logo} alt="Partner Logo" className="max-h-[64px] max-w-[130px] object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
