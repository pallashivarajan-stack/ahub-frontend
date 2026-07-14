import { SectionHeading } from "@/components/ui-ahub/SectionHeading";
import { usePublicPartners } from "@/services/usePublicContent";
import { resolveLegacyAsset } from "@/lib/assets";

const legacyPaths = [
  "/src/assets/partners/alcove.jpg",
  "/src/assets/partners/atpi.jpg",
  "/src/assets/partners/avanti.png",
  "/src/assets/partners/icompass.png",
  "/src/assets/partners/ministry of sceince.png",
  "/src/assets/partners/msme-logo-p.png",
  "/src/assets/partners/nasscom.png",
  "/src/assets/partners/rosys.jpg",
  "/src/assets/partners/sandlogic.jpg",
  "/src/assets/partners/tie.jpg",
];

const partnerFallback = legacyPaths.map(resolveLegacyAsset);

export function MeshNetwork() {
  const { data: partnerLogosData } = usePublicPartners(partnerFallback);
  const row1 = partnerLogosData;
  const row2 = [...partnerLogosData].reverse();

  const loop1 = [...row1, ...row1];
  const loop2 = [...row2, ...row2];

  return (
    <section id="mesh-network" className="relative overflow-hidden py-16 md:py-24">
      
      <div className="site-container-wide">
        <SectionHeading eyebrow="Connected" title="Mesh Network" subtitle="A thriving ecosystem of partners, institutions, and industry leaders." align="center" />
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
