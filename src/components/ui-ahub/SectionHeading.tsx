import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  light = false,
  titleSize = "default",
  subtitleColor,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  titleSize?: "small" | "default" | "large";
  subtitleColor?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs uppercase tracking-[0.18em]",
            light ? "border-white/20 text-white/80" : "border-primary/20 text-primary/80",
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", light ? "bg-white" : "bg-primary")} />
          {eyebrow}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className={cn(
          "text-balance font-display font-medium leading-[1.05] tracking-tight",
          titleSize === "small" && "text-2xl md:text-3xl lg:text-4xl",
          titleSize === "default" && "text-4xl md:text-5xl lg:text-[3.5rem]",
          titleSize === "large" && "text-5xl md:text-6xl lg:text-7xl",
          light ? "text-white" : "text-foreground",
        )}
        style={!light ? { color: "#000000" } : {}}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          className={cn(
            "mt-5 text-balance text-base leading-relaxed md:text-lg",
            subtitleColor ? "" : (light ? "text-white/70" : "text-muted-foreground"),
          )}
          style={subtitleColor ? { color: subtitleColor } : {}}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
