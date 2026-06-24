import { SectionHeading } from "@/components/ui-ahub/SectionHeading";
import { usePublicPartners } from "@/hooks/usePublicContent";

import alcove from "@/assets/partners/alcove.jpg";
import atpi from "@/assets/partners/atpi.jpg";
import avanti from "@/assets/partners/avanti.png";
import digifac from "@/assets/partners/digifac.png";
import icompass from "@/assets/partners/icompass.png";
import ministry from "@/assets/partners/ministry of sceince.png";
import nasscom from "@/assets/partners/nasscom.png";
import rosys from "@/assets/partners/rosys.jpg";
import sandlogic from "@/assets/partners/sandlogic.jpg";
import tie from "@/assets/partners/tie.jpg";

const partnerLogos = [
  alcove, atpi, avanti, digifac, icompass, ministry, nasscom, rosys, sandlogic, tie
];

export function Partners() {
  const { data: partnerLogosData } = usePublicPartners(partnerLogos);
  const row1 = partnerLogosData;
  const row2 = [...partnerLogosData].reverse();

  const loop1 = [...row1, ...row1];
  const loop2 = [...row2, ...row2];

  return (
    <section id="associate" className="relative overflow-hidden border-y border-[color:color-mix(in_oklch,var(--primary)_10%,transparent)] bg-[linear-gradient(180deg,#FFF7F2_0%,#FFFFFF_100%)] py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_45%_at_50%_0%,rgba(255,191,128,0.18),transparent_58%),radial-gradient(36%_24%_at_10%_18%,rgba(255,233,214,0.38),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="Associated With" title="Backed by builders, funds and institutions." align="center" />
      </div>

      <div className="mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-14 px-6">
          {loop1.map((logo, i) => (
            <div
              key={i}
              className="grid h-16 min-w-[160px] place-items-center transition-all duration-500"
            >
              <img src={logo} alt="Partner Logo" className="max-h-12 max-w-[140px] object-contain" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max animate-marquee-slow items-center gap-14 px-6" style={{ animationDirection: "reverse" }}>
          {loop2.map((logo, i) => (
            <div
              key={i}
              className="grid h-16 min-w-[160px] place-items-center transition-all duration-500"
            >
              <img src={logo} alt="Partner Logo" className="max-h-12 max-w-[140px] object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
