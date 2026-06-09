import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export const MagneticButton = forwardRef<HTMLButtonElement, Props>(function MagneticButton(
  { variant = "primary", className, children, ...rest },
  _ref,
) {
  const magRef = useMagnetic<HTMLButtonElement>(0.25);
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const variants: Record<Variant, string> = {
    primary:
      "bg-[linear-gradient(135deg,#5B0E2D,#7A163B)] text-white shadow-[0_10px_30px_-12px_rgba(91,14,45,0.52)] hover:shadow-[0_18px_40px_-14px_rgba(91,14,45,0.74)] hover:-translate-y-0.5",
    outline:
      "border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground",
    ghost:
      "text-foreground/80 hover:text-primary",
  };
  return (
    <button ref={magRef} className={cn(base, variants[variant], className)} {...rest}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.22), transparent 60%)" }}
      />
    </button>
  );
});
