import { ArrowRight, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/data";

export function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('❌ Please enter a valid email');
      return;
    }

    setLoading(true);
    try {
      // Simulated API call - replace with real endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('✅ Thanks! Check your email to confirm.');
      setEmail('');
    } catch (error) {
      setMessage('❌ Something went wrong. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer id="about" className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(10,10,10,0.99)_0%,rgba(6,6,6,0.98)_46%,rgba(0,0,0,1)_100%)] text-[#f6f6f6]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_0%,rgba(255,255,255,0.07),transparent_65%),radial-gradient(45%_35%_at_92%_12%,rgba(255,255,255,0.06),transparent_52%)]" />
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.9fr_0.9fr_1.05fr] lg:gap-14">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-md border border-white/14 bg-white/14 text-sm font-bold text-white">A</span>
              <span className="h-5 w-px bg-white/18" />
              <span className="font-brand text-2xl font-black tracking-[0.14em] text-white">āhub</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/80">
              An institutional incubation centre building India's next generation of category-defining startups.
            </p>
            <div className="mt-6 flex gap-2">
              {[
                { Icon: Twitter, href: "https://twitter.com/ahub_in", label: "Twitter" },
                { Icon: Linkedin, href: "https://linkedin.com/company/ahub-in", label: "LinkedIn" },
                { Icon: Instagram, href: "https://instagram.com/ahub.in", label: "Instagram" },
                { Icon: Github, href: "https://github.com/ahub", label: "GitHub" },
              ].map(({ Icon, href, label }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-8 w-8 place-items-center rounded-full border border-white/14 bg-white/10 text-white/82 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/18 hover:text-white hover:shadow-[0_14px_30px_-18px_rgba(0,0,0,0.8)]">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-white/62">Navigate</div>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="inline-block text-white/84 transition-all duration-300 hover:-translate-y-0.5 hover:text-white hover:underline hover:decoration-white/40 hover:underline-offset-4">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-white/62">Contact</div>
            <ul className="mt-5 space-y-3 text-sm text-white/84">
              <li>AHUB Innovation Centre</li>
              <li>AU north campus, madillapalem,</li>
              <li>visakhapatnam - 530013.</li>
              <li className="pt-1">techsupport@a-hub.co</li>
              <li>+91 44 4500 2200</li>
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-white/62">Newsletter</div>
            <p className="mt-5 text-sm leading-relaxed text-white/78">A short, monthly note from the floor. No noise.</p>
            <form onSubmit={handleSubscribe} className="mt-5 flex overflow-hidden rounded-[18px] border border-white/14 bg-white/12 shadow-[0_18px_50px_-36px_rgba(0,0,0,0.7)] backdrop-blur-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                disabled={loading}
                className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/42 focus:outline-none disabled:opacity-50"
              />
              <button type="submit" disabled={loading} className="grid w-12 place-items-center bg-[linear-gradient(135deg,#111111,#000000)] text-white transition-all duration-300 hover:bg-[linear-gradient(135deg,#1a1a1a,#050505)] disabled:opacity-50" aria-label="Subscribe">
                <ArrowRight size={loading ? 0 : 14} />
                {loading && <span className="text-xs">...</span>}
              </button>
            </form>
            {message && <p className={`mt-3 text-xs ${message.includes('❌') ? 'text-red-400' : 'text-green-400'}`}>{message}</p>}
          </div>
        </div>
      </div>
    </footer>
  );
}
