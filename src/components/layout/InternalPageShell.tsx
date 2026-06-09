import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function InternalPageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="relative overflow-x-clip bg-[radial-gradient(circle_at_top_right,rgba(91,14,45,0.12),transparent_30%),linear-gradient(180deg,#fcf8f6_0%,#fffaf8_48%,#ffffff_100%)] text-foreground">
      <Navbar />
      <section className="relative isolate overflow-hidden pt-28 md:pt-32 lg:pt-36">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_70%_at_50%_0%,rgba(91,14,45,0.1),transparent_56%),linear-gradient(180deg,rgba(252,248,246,0.96),rgba(255,250,248,0.96))] animate-gradient-pan" />
        <div className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
          <div className="max-w-3xl rounded-[28px] border border-[rgba(91,14,45,0.08)] bg-white/88 p-8 shadow-[0_20px_54px_-34px_rgba(91,14,45,0.2)] backdrop-blur-md md:p-10">
            <div className="inline-flex items-center rounded-full border border-[rgba(91,14,45,0.12)] bg-[rgba(91,14,45,0.06)] px-3 py-1 text-[0.64rem] uppercase tracking-[0.24em] text-primary">
              {eyebrow}
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {description}
            </p>
          </div>
        </div>
      </section>
      <div className="pb-8">{children}</div>
      <Footer />
    </main>
  );
}
