// Deterministic initials avatar — no external image needed.
export function Avatar({ name, size = 56 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase();
  const hash = [...name].reduce((a, c) => a + c.charCodeAt(0), 0);
  const hue = (hash * 13) % 360;
  return (
    <div
      aria-hidden
      className="flex shrink-0 items-center justify-center rounded-full font-display text-base font-semibold text-white ring-1 ring-white/30"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(120% 120% at 30% 20%, hsl(${hue} 35% 38%), hsl(${(hue + 30) % 360} 45% 22%))`,
      }}
    >
      {initials}
    </div>
  );
}
