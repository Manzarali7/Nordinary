import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import UnicornScene from "unicornstudio-react";

const AMBER = "#F59E0B";
const AMBER_DARK = "#D97706";
const AMBER_LIGHT = "#FCD34D";
const BASE = import.meta.env.BASE_URL;

function GlowCard({
  children,
  className = "",
  intensity = 1,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        background: "rgba(16, 11, 3, 0.52)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.11)",
        boxShadow: `0 12px 48px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,220,100,0.04)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-20"
        style={{
          height: 2,
          background: `linear-gradient(90deg,
            transparent 0%,
            transparent 8%,
            rgba(245,158,11,${0.45 * intensity}) 22%,
            rgba(252,211,77,${0.95 * intensity}) 42%,
            rgba(255,235,120,${1 * intensity}) 50%,
            rgba(252,211,77,${0.95 * intensity}) 58%,
            rgba(245,158,11,${0.45 * intensity}) 78%,
            transparent 92%,
            transparent 100%)`,
          borderRadius: "2px 2px 0 0",
        }}
      />
      <div
        className="pointer-events-none absolute z-10"
        style={{
          right: -40,
          bottom: -40,
          width: 280 * intensity,
          height: 280 * intensity,
          background: `radial-gradient(circle at 65% 65%,
            rgba(255,180,30,${0.72 * intensity}) 0%,
            rgba(230,140,10,${0.55 * intensity}) 18%,
            rgba(200,110,0,${0.35 * intensity}) 36%,
            rgba(160,80,0,${0.15 * intensity}) 58%,
            transparent 76%)`,
          filter: "blur(28px)",
          borderRadius: "50%",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20"
        style={{
          height: 2,
          background: `linear-gradient(90deg,
            transparent 0%,
            transparent 8%,
            rgba(245,158,11,${0.07 * intensity}) 22%,
            rgba(252,211,77,${0.14 * intensity}) 42%,
            rgba(255,235,120,${0.16 * intensity}) 50%,
            rgba(252,211,77,${0.14 * intensity}) 58%,
            rgba(245,158,11,${0.07 * intensity}) 78%,
            transparent 92%,
            transparent 100%)`,
          borderRadius: "0 0 2px 2px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl z-20"
        style={{ border: "1px solid rgba(255,255,255,0.07)" }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function CornerGlowCard({
  children,
  className = "",
  intensity = 1,
  corner = "tl",
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  corner?: "tl" | "tr" | "bl" | "br";
}) {
  const isTop  = corner === "tl" || corner === "tr";
  const isLeft = corner === "tl" || corner === "bl";
  const spotSize = 340 * intensity;

  const spotPos: React.CSSProperties = isTop
    ? (isLeft ? { top: -55, left: -55 }    : { top: -55, right: -55 })
    : (isLeft ? { bottom: -55, left: -55 } : { bottom: -55, right: -55 });

  const hEdgeStyle: React.CSSProperties = {
    ...(isTop ? { top: 0 } : { bottom: 0 }),
    ...(isLeft ? { left: 0 } : { right: 0 }),
    width: "55%",
    height: 1,
    background: `linear-gradient(${isLeft ? "to right" : "to left"},
      rgba(255,240,130,${0.95 * intensity}) 0%,
      rgba(245,158,11,${0.45 * intensity}) 30%,
      transparent 100%)`,
  };

  const vEdgeStyle: React.CSSProperties = {
    ...(isTop ? { top: 0 } : { bottom: 0 }),
    ...(isLeft ? { left: 0 } : { right: 0 }),
    width: 1,
    height: "55%",
    background: `linear-gradient(${isTop ? "to bottom" : "to top"},
      rgba(255,240,130,${0.95 * intensity}) 0%,
      rgba(245,158,11,${0.45 * intensity}) 30%,
      transparent 100%)`,
  };

  const pixelPos: React.CSSProperties = isTop
    ? (isLeft ? { top: 0, left: 0 }    : { top: 0, right: 0 })
    : (isLeft ? { bottom: 0, left: 0 } : { bottom: 0, right: 0 });

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        background: "rgba(7, 5, 2, 0.88)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.7)",
      }}
    >
      <div className="pointer-events-none absolute z-10" style={{
        ...spotPos,
        width: spotSize,
        height: spotSize,
        background: `radial-gradient(circle at center,
          rgba(255,210,60,${0.5 * intensity}) 0%,
          rgba(245,158,11,${0.36 * intensity}) 22%,
          rgba(200,100,5,${0.16 * intensity}) 48%,
          transparent 70%)`,
        filter: `blur(${34 * intensity}px)`,
        borderRadius: "50%",
      }} />
      <div className="pointer-events-none absolute z-20" style={hEdgeStyle} />
      <div className="pointer-events-none absolute z-20" style={vEdgeStyle} />
      <div className="pointer-events-none absolute z-20" style={{
        ...pixelPos,
        width: 4,
        height: 4,
        background: `rgba(255,250,180,${intensity})`,
        borderRadius: "50%",
        boxShadow: `0 0 6px rgba(255,240,100,${intensity}), 0 0 16px rgba(245,158,11,${0.85 * intensity})`,
      }} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
      style={{
        background: "linear-gradient(135deg, rgba(245,158,11,0.14) 0%, rgba(245,158,11,0.07) 100%)",
        border: "1px solid rgba(245,158,11,0.32)",
        color: AMBER_LIGHT,
        boxShadow: "0 0 20px rgba(245,158,11,0.12), inset 0 1px 0 rgba(255,235,120,0.15)",
        letterSpacing: "0.12em",
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${AMBER_LIGHT}, ${AMBER})`,
          display: "inline-block",
          boxShadow: `0 0 8px ${AMBER}, 0 0 16px rgba(245,158,11,0.5)`,
        }}
      />
      {children}
    </span>
  );
}

function ScrollMarquee() {
  const items = [
    "Social-Media Management",
    "Content Produktion",
    "Performance Marketing",
    "Webdesign & Branding",
    "Community Management",
    "Paid Ads & ROI",
  ];
  const tripled = [...items, ...items, ...items];

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-8%" }}
      className="relative w-full overflow-hidden"
      style={{
        transform: "rotate(-1.5deg) scaleX(1.06)",
        transformOrigin: "center",
        marginTop: "2px",
        marginBottom: "2px",
      }}
    >
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.09)",
          borderBottom: "1px solid rgba(255,255,255,0.09)",
          background: "rgba(6,5,2,0.72)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          padding: "16px 0",
          overflow: "hidden",
        }}
      >
        <div
          className="flex whitespace-nowrap"
          style={{
            animation: "ticker 34s linear infinite",
            width: "max-content",
            gap: "0",
          }}
        >
          {tripled.map((item, i) => (
            <span
              key={i}
              className="flex items-center text-sm font-bold uppercase tracking-widest"
              style={{
                color: "rgba(255,228,188,0.47)",
                paddingLeft: 48,
                paddingRight: 48,
              }}
            >
              {item}
              <span
                style={{
                  color: AMBER,
                  fontSize: 14,
                  opacity: 0.65,
                  marginLeft: 48,
                }}
              >
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function DomeLightLeak({
  opacity = 1,
  size = 440,
  className = "",
}: {
  opacity?: number;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{
        width: size,
        height: size * 0.52,
        background: `radial-gradient(ellipse 100% 100% at 50% 100%,
          rgba(255,210,0,${0.7 * opacity}) 0%,
          rgba(245,158,11,${0.45 * opacity}) 22%,
          rgba(200,130,0,${0.18 * opacity}) 50%,
          transparent 72%)`,
        clipPath: "ellipse(50% 100% at 50% 100%)",
        filter: `blur(${size / 22}px)`,
      }}
    />
  );
}

function ApertureLightLeak({
  opacity = 1,
  size = 320,
  rayCount = 8,
  className = "",
}: {
  opacity?: number;
  size?: number;
  rayCount?: number;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{ width: size, height: size }}
    >
      {Array.from({ length: rayCount }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 3,
            height: size * 0.5,
            transformOrigin: "50% 100%",
            transform: `translateX(-50%) translateY(-100%) rotate(${i * (360 / rayCount)}deg)`,
            background: `linear-gradient(to top,
              rgba(255,215,0,${0.75 * opacity}) 0%,
              rgba(245,158,11,${0.3 * opacity}) 40%,
              transparent 100%)`,
            filter: "blur(2px)",
          }}
        />
      ))}
      {[0, 90].map((angle) => (
        <div
          key={angle}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 1.5,
            height: size * 0.5,
            transformOrigin: "50% 100%",
            transform: `translateX(-50%) translateY(-100%) rotate(${angle}deg)`,
            background: `linear-gradient(to top,
              rgba(255,245,150,${0.9 * opacity}) 0%,
              rgba(255,215,0,${0.5 * opacity}) 30%,
              transparent 100%)`,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: size * 0.12,
          height: size * 0.12,
          borderRadius: "50%",
          background: `radial-gradient(circle,
            rgba(255,245,150,${opacity}) 0%,
            rgba(255,210,0,${0.6 * opacity}) 40%,
            transparent 100%)`,
          filter: "blur(3px)",
        }}
      />
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleScroll = () => setScrolled(el.scrollTop > 40);
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-y-auto overflow-x-hidden"
      style={{
        background: "#080808",
        color: "#fff",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        height: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(245,158,11,0.3); }
          50% { box-shadow: 0 0 40px rgba(245,158,11,0.6), 0 0 80px rgba(245,158,11,0.2); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fadeup { animation: fadeUp 0.7s ease forwards; }

        .btn-primary {
          background: linear-gradient(135deg, ${AMBER} 0%, ${AMBER_DARK} 100%);
          color: #0a0700;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .btn-primary:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 32px rgba(245,158,11,0.45);
        }

        .btn-outline {
          background: transparent;
          color: ${AMBER};
          font-weight: 600;
          border: 1px solid rgba(245,158,11,0.4);
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .btn-outline:hover {
          background: rgba(245,158,11,0.08);
          border-color: ${AMBER};
          transform: translateY(-2px);
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .btn-primary {
          background-size: 200% auto;
        }

        .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(245,158,11,0.15) 10%, rgba(245,158,11,0.38) 35%, rgba(252,211,77,0.5) 50%, rgba(245,158,11,0.38) 65%, rgba(245,158,11,0.15) 90%, transparent);
          position: relative;
        }
        .section-divider::after {
          content: '';
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(4px);
          opacity: 0.5;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: rgba(245,158,11,0.3); border-radius: 2px; }
      `}</style>

      {/* ── NAV ── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-8 py-4"
        style={{
          background: scrolled ? "rgba(8,6,4,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(245,158,11,0.1)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="text-xl font-black tracking-tight"
            style={{ letterSpacing: "-0.03em" }}
          >
            <span style={{ color: AMBER }}>(n)</span>
            <span style={{ color: "#fff" }}>ordinary</span>
          </span>
          <span
            className="text-xs font-medium uppercase tracking-widest ml-1"
            style={{ color: "rgba(255,228,188,0.38)" }}
          >
            STUDIOS
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Leistungen", "Projekte", "Über uns", "Blog"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium transition-colors"
              style={{ color: "rgba(255,228,188,0.6)", textDecoration: "none" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#fff")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,228,188,0.6)")}
            >
              {item}
            </a>
          ))}
        </div>
        <button
          className="btn-primary rounded-full px-5 py-2.5 text-sm"
        >
          Erstgespräch buchen
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-32 text-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 55% at 50% 60%, rgba(245,158,11,0.11) 0%, transparent 70%)",
          }}
        />
        <DomeLightLeak
          opacity={0.55}
          size={560}
          className="bottom-0 left-1/2 -translate-x-1/2"
        />
        <ApertureLightLeak
          opacity={0.28}
          size={260}
          rayCount={10}
          className="-top-8 -left-8"
        />
        <ApertureLightLeak
          opacity={0.18}
          size={200}
          rayCount={8}
          className="top-1/3 -right-10"
        />

        <div className="relative z-10 max-w-4xl mx-auto fadeup">
          <Badge>Deine Social Media Agentur in Wien</Badge>

          <h1
            className="mt-8 font-black leading-none"
            style={{
              fontSize: "clamp(42px, 7vw, 88px)",
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
            }}
          >
            deine{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${AMBER_LIGHT}, ${AMBER}, ${AMBER_DARK})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Social Media
            </span>
            <br />
            Agentur in Wien.
          </h1>

          <p
            className="mt-8 max-w-2xl mx-auto leading-relaxed text-lg"
            style={{ color: "rgba(255,228,188,0.6)" }}
          >
            Individuelle Content-Strategien, die Kreativität und messbare Ergebnisse verbinden.
            Von smarten Marketingstrategien über professionellen Content bis hin zu maßgeschneidertem
            Webdesign – wir schaffen Lösungen, die deine Marke stärken.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button className="btn-primary rounded-full px-8 py-4 text-base">
              Erstgespräch vereinbaren
            </button>
            <button className="btn-outline rounded-full px-8 py-4 text-base">
              Leistungen entdecken
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { value: "50+", label: "Unternehmen" },
              { value: "3+", label: "Jahre Erfahrung" },
              { value: "100%", label: "Einsatz" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-3xl font-black"
                  style={{
                    background: `linear-gradient(135deg, ${AMBER_LIGHT}, ${AMBER})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-xs mt-1" style={{ color: "rgba(255,228,188,0.42)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
        >
          <span className="text-xs uppercase tracking-widest" style={{ color: AMBER }}>
            Scroll
          </span>
          <div
            style={{
              width: 1,
              height: 40,
              background: `linear-gradient(to bottom, ${AMBER}, transparent)`,
            }}
          />
        </div>
      </section>

      {/* ── SCROLL MARQUEE ── */}
      <ScrollMarquee />

      {/* ── SERVICES ── */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(245,158,11,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <Badge>Leistungen</Badge>
            <h2
              className="mt-6 font-black"
              style={{
                fontSize: "clamp(32px, 4vw, 52px)",
                letterSpacing: "-0.03em",
              }}
            >
              Unsere Leistungen im{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${AMBER_LIGHT}, ${AMBER})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Überblick
              </span>
            </h2>
            <p
              className="mt-4 max-w-xl mx-auto leading-relaxed"
              style={{ color: "rgba(255,228,188,0.52)" }}
            >
              Ob du dein Markenimage stärken, neue Kunden gewinnen oder bestehende
              Zielgruppen begeistern möchtest – wir begleiten dich zum Erfolg.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {[
              {
                title: "Social-Media Management",
                desc: "Vollständige Betreuung deiner Kanäle – von der Strategie bis zur Umsetzung. Wir sorgen für konsistente Präsenz, Community-Pflege und messbares Wachstum.",
                icon: "📱",
                tags: ["Instagram", "TikTok", "LinkedIn"],
              },
              {
                title: "Content Produktion",
                desc: "Hochwertige Foto- und Videoproduktionen, die deine Marke zum Leben erwecken. Von der Konzeption bis zum fertigen Content – alles aus einer Hand.",
                icon: "🎬",
                tags: ["Video", "Fotografie", "Reels"],
              },
              {
                title: "Performance Marketing",
                desc: "Datengetriebene Werbekampagnen mit maximaler Reichweite und messbarem ROI. Paid Social, Targeting-Optimierung und kontinuierliches Reporting.",
                icon: "📈",
                tags: ["Meta Ads", "TikTok Ads", "ROI"],
              },
              {
                title: "Webdesign & Branding",
                desc: "Professionelle Webauftritte und Markenidentitäten, die Vertrauen schaffen und konvertieren. Von der Markenanalyse bis zum fertigen Onlineauftritt.",
                icon: "✨",
                tags: ["Webdesign", "Branding", "UX"],
              },
            ].map((service, i) => (
              <GlowCard key={i} className="p-8" intensity={1}>
                <div
                  className="text-3xl mb-5 w-14 h-14 flex items-center justify-center rounded-2xl"
                  style={{ background: "rgba(245,158,11,0.08)" }}
                >
                  {service.icon}
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: "#fff" }}
                >
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,228,188,0.47)" }}>
                  {service.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(245,158,11,0.08)",
                        border: "1px solid rgba(245,158,11,0.18)",
                        color: "rgba(252,211,77,0.7)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-16" />

      {/* ── PROCESS ── */}
      <section className="py-28 px-6 relative overflow-hidden">
        <img
          src={`${BASE}gold-particles.jpeg`}
          aria-hidden="true"
          className="pointer-events-none absolute select-none"
          style={{
            left: 0,
            top: "10%",
            width: 480,
            height: 480,
            objectFit: "cover",
            objectPosition: "left center",
            opacity: 0.18,
            maskImage: [
              "radial-gradient(ellipse 70% 80% at 10% 50%, black 0%, transparent 100%)",
            ].join(", "),
            WebkitMaskImage: [
              "radial-gradient(ellipse 70% 80% at 10% 50%, black 0%, transparent 100%)",
            ].join(", "),
            mixBlendMode: "screen",
          }}
        />
        <img
          src={`${BASE}gold-streaks.png`}
          aria-hidden="true"
          className="pointer-events-none absolute select-none"
          style={{
            right: 0,
            bottom: "5%",
            width: 360,
            height: 360,
            objectFit: "cover",
            objectPosition: "right bottom",
            opacity: 0.14,
            maskImage: "radial-gradient(ellipse 80% 80% at 90% 90%, black 0%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 90% 90%, black 0%, transparent 100%)",
            mixBlendMode: "screen",
          }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <Badge>Unser Prozess</Badge>
            <h2
              className="mt-6 font-black"
              style={{
                fontSize: "clamp(32px, 4vw, 52px)",
                letterSpacing: "-0.03em",
              }}
            >
              So arbeiten wir{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${AMBER_LIGHT}, ${AMBER})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                für dich
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-5">
            {[
              {
                step: "01",
                title: "Analyse",
                desc: "Wir analysieren deine aktuelle Situation, Zielgruppe und Wettbewerber, um die beste Strategie zu entwickeln.",
              },
              {
                step: "02",
                title: "Strategie",
                desc: "Basierend auf der Analyse entwickeln wir eine maßgeschneiderte Content-Strategie mit klaren KPIs.",
              },
              {
                step: "03",
                title: "Umsetzung",
                desc: "Unser Team setzt die Strategie mit hochwertigem Content und präzisem Timing in die Tat um.",
              },
              {
                step: "04",
                title: "Optimierung",
                desc: "Wir messen, analysieren und optimieren kontinuierlich, um maximale Ergebnisse zu erzielen.",
              },
            ].map((step, i) => (
              <CornerGlowCard key={i} className="p-7" intensity={0.9} corner={["tl","tr","bl","br"][i] as "tl"|"tr"|"bl"|"br"}>
                <div
                  className="text-4xl font-black mb-4 opacity-20"
                  style={{ color: AMBER, lineHeight: 1 }}
                >
                  {step.step}
                </div>
                <h3
                  className="text-base font-bold mb-3"
                  style={{ color: "#fff" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,228,188,0.42)" }}>
                  {step.desc}
                </p>
              </CornerGlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section className="py-28 px-6 relative overflow-hidden">
        <img
          src={`${BASE}amber-glow.png`}
          aria-hidden="true"
          className="pointer-events-none absolute select-none"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 900,
            height: 900,
            objectFit: "cover",
            opacity: 0.07,
            maskImage: [
              "radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 70%)",
              "linear-gradient(to bottom, transparent 0%, black 18%, black 45%, transparent 100%)",
            ].join(", "),
            WebkitMaskImage: [
              "radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 70%)",
              "linear-gradient(to bottom, transparent 0%, black 18%, black 45%, transparent 100%)",
            ].join(", "),
            mixBlendMode: "screen",
          }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <Badge>Herausforderungen</Badge>
            <h2
              className="mt-6 font-black"
              style={{
                fontSize: "clamp(28px, 3.5vw, 46px)",
                letterSpacing: "-0.03em",
              }}
            >
              Die meisten Unternehmer treffen auf{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${AMBER_LIGHT}, ${AMBER})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                diese Herausforderungen
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {[
              {
                q: "Du weißt nicht wo du anfangen sollst?",
                a: "Neben deinem Kerngeschäft raubt dir Social Media enorm viel Energie. Ständig Skripte schreiben, Videos aufnehmen – der Aufwand ist überwältigend.",
                icon: "😤",
              },
              {
                q: "Dein Content performt nicht wie gewünscht?",
                a: "Du investierst Zeit und Energie – doch die Ergebnisse bleiben aus. Mit einer klaren Content-Strategie verwandelst du Social Media in einen echten Umsatztreiber.",
                icon: "📉",
              },
              {
                q: "Du hast keine Zeit für die Erstellung des Contents?",
                a: "Als Unternehmer lohnt es sich, zeitintensive Arbeit abzugeben. Statt dich in Details zu verlieren, konzentrierst du dich voll auf dein Kerngeschäft.",
                icon: "⏰",
              },
            ].map((item, i) => (
              <GlowCard key={i} className="p-7" intensity={1}>
                <div
                  className="text-3xl mb-5 w-12 h-12 flex items-center justify-center rounded-xl"
                  style={{ background: "rgba(245,158,11,0.08)" }}
                >
                  {item.icon}
                </div>
                <h3
                  className="text-base font-bold mb-3 leading-snug"
                  style={{ color: "#fff" }}
                >
                  {item.q}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,228,188,0.42)" }}>
                  {item.a}
                </p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY SOCIAL MEDIA ── */}
      <section
        className="py-28 px-6 relative overflow-hidden"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(245,158,11,0.05) 0%, transparent 70%)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge>Warum Social Media?</Badge>
            <h2
              className="mt-6 font-black"
              style={{
                fontSize: "clamp(28px, 3.5vw, 46px)",
                letterSpacing: "-0.03em",
              }}
            >
              Vom ersten Blick bis zum{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${AMBER_LIGHT}, ${AMBER})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Kaufabschluss
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {[
              {
                step: "01",
                title: "Awareness",
                desc: "Social Media sorgt dafür, dass du in deiner Zielgruppe sichtbar wirst. Mit den richtigen Inhalten erreichst du genau die Menschen, die zu deinem Angebot passen.",
              },
              {
                step: "02",
                title: "Interest & Desire",
                desc: "Über deine Inhalte führst du potenzielle Kunden weiter: von erster Neugier bis hin zu echtem Interesse. Durch Storytelling wächst der Wunsch, mehr zu erfahren.",
              },
              {
                step: "03",
                title: "Action",
                desc: "Gezielte Call-to-Actions leiten deine Community dahin, wo Conversions passieren: Anfragen, Buchungen oder Käufe – planbare Wachstumsstrategie mit messbarem Impact.",
              },
            ].map((item, i) => (
              <GlowCard key={i} className="p-8 text-center" intensity={0.9}>
                <div
                  className="text-xs font-black uppercase tracking-widest mb-4"
                  style={{ color: "rgba(245,158,11,0.5)" }}
                >
                  Schritt {item.step}
                </div>
                <div
                  className="text-6xl font-black mb-4"
                  style={{
                    background: `linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    lineHeight: 1,
                  }}
                >
                  {item.step}
                </div>
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: "#fff" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,228,188,0.47)" }}>
                  {item.desc}
                </p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-16" />

      {/* ── ABOUT ── */}
      <section className="py-28 px-6 relative overflow-hidden">
        <DomeLightLeak opacity={0.35} size={480} className="bottom-0 right-0 translate-x-1/4" />
        <ApertureLightLeak opacity={0.2} size={220} rayCount={10} className="-top-10 left-8" />
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <Badge>Wir sind nicht 0815. Wir lösen Probleme.</Badge>
            <h2
              className="mt-6 font-black leading-tight"
              style={{
                fontSize: "clamp(28px, 3.5vw, 46px)",
                letterSpacing: "-0.03em",
              }}
            >
              (n)ordinary studios schafft{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${AMBER_LIGHT}, ${AMBER})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Wirkung
              </span>{" "}
              für Ihr Unternehmen.
            </h2>
            <p
              className="mt-6 leading-relaxed"
              style={{ color: "rgba(255,228,188,0.52)", fontSize: 16 }}
            >
              Wir haben unzählige Kampagnen konzipiert und umgesetzt, die nicht nur Reichweite
              generierten, sondern echte Verbindungen geschafft haben. Von kreativen
              Content-Strategien über präzises Targeting bis hin zur Performance-Analyse –
              wir kombinieren Kreativität mit datenbasiertem Denken.
            </p>
            <button className="btn-primary rounded-full px-7 py-3.5 text-sm mt-8">
              Mehr erfahren
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { val: "50+", label: "Unternehmen in Österreich vertrauen uns" },
              { val: "100%", label: "Einsatz bei jedem Projekt" },
              { val: "3+", label: "Jahre Agenturerfahrung" },
              { val: "∞", label: "Kreativität ohne Grenzen" },
            ].map((stat, i) => (
              <GlowCard key={i} className="p-6 text-center" intensity={0.8}>
                <div
                  className="text-3xl font-black mb-2"
                  style={{
                    background: `linear-gradient(135deg, ${AMBER_LIGHT}, ${AMBER})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {stat.val}
                </div>
                <div
                  className="text-xs leading-snug"
                  style={{ color: "rgba(255,228,188,0.42)" }}
                >
                  {stat.label}
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── REFERENCES ── */}
      <section className="py-28 px-6 relative overflow-hidden">
        <DomeLightLeak opacity={0.3} size={400} className="bottom-0 left-0 -translate-x-1/4" />
        <ApertureLightLeak opacity={0.18} size={200} rayCount={10} className="-top-8 right-12" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <Badge>Ausgewählte Referenzen</Badge>
            <h2
              className="mt-6 font-black"
              style={{
                fontSize: "clamp(28px, 3.5vw, 46px)",
                letterSpacing: "-0.03em",
              }}
            >
              Projekte, auf die wir{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${AMBER_LIGHT}, ${AMBER})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                stolz sind
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {[
              {
                title: "TAXI40100 – Spotify Kampagne",
                tag: "Paid-Ad Kampagne",
                color: "#1a2a1a",
                accent: "#4CAF50",
              },
              {
                title: "KAHLES – Produkt-Launch",
                tag: "Content Produktion",
                color: "#1a1a2a",
                accent: "#5C6BC0",
              },
              {
                title: "Celesteau – Shopify Shop",
                tag: "Webdesign",
                color: "#2a1a1a",
                accent: "#EF9A9A",
              },
            ].map((ref, i) => (
              <GlowCard key={i} className="overflow-hidden group" intensity={1.1}>
                <div
                  className="h-44 flex items-center justify-center relative"
                  style={{ background: ref.color }}
                >
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${ref.accent}33, transparent 70%)`,
                    }}
                  />
                  <span
                    className="relative z-10 text-3xl font-black uppercase tracking-tighter opacity-20"
                    style={{ color: ref.accent }}
                  >
                    {ref.title.split("–")[0].trim()}
                  </span>
                </div>
                <div className="p-6">
                  <div
                    className="text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: AMBER, opacity: 0.7 }}
                  >
                    {ref.tag}
                  </div>
                  <h3 className="text-base font-bold" style={{ color: "#fff" }}>
                    {ref.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold" style={{ color: AMBER }}>
                    Ansehen <span>→</span>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(245,158,11,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          className="max-w-6xl mx-auto text-center relative rounded-3xl overflow-hidden"
          style={{
            border: "1px solid rgba(255,255,255,0.11)",
          }}
        >
          <div className="absolute inset-0 z-0">
            <UnicornScene
              projectId="UC9oKoDWjxF2spKEmVE1"
              sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.12/dist/unicornStudio.umd.js"
              width="100%"
              height="100%"
            />
          </div>
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: "rgba(8,6,2,0.55)",
            }}
          />
          <div className="relative z-20 px-16 py-20">
            <Badge>Schreib' uns noch heute!</Badge>
            <h2
              className="mt-6 font-black"
              style={{
                fontSize: "clamp(28px, 4vw, 52px)",
                letterSpacing: "-0.03em",
              }}
            >
              Worauf willst du noch{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${AMBER_LIGHT}, ${AMBER})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                warten?
              </span>
            </h2>
            <p
              className="mt-5 leading-relaxed max-w-2xl mx-auto"
              style={{ color: "rgba(255,228,188,0.52)", fontSize: 17 }}
            >
              Jeder Tag ohne professionelle Social-Media-Inhalte{" "}
              <strong style={{ color: "rgba(255,255,255,0.8)" }}>
                kostet dich Sichtbarkeit, Reichweite und Kunden
              </strong>
              . Handle jetzt – bevor es deine Mitbewerber tun.
            </p>
            <button className="btn-primary rounded-full px-10 py-4 text-base mt-8">
              Erstgespräch vereinbaren
            </button>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-28 px-6 relative overflow-hidden">
        <img
          src={`${BASE}gold-particles.jpeg`}
          aria-hidden="true"
          className="pointer-events-none absolute select-none"
          style={{
            right: 0,
            top: "20%",
            transform: "translateY(-20%)",
            width: 380,
            height: 380,
            objectFit: "cover",
            objectPosition: "right center",
            opacity: 0.22,
            maskImage:
              "radial-gradient(ellipse 80% 80% at 80% 50%, black 0%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 80% 50%, black 0%, transparent 100%)",
            mixBlendMode: "screen",
          }}
        />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2
              className="font-black"
              style={{
                fontSize: "clamp(28px, 3.5vw, 46px)",
                letterSpacing: "-0.03em",
              }}
            >
              Maximaler ROI —{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${AMBER_LIGHT}, ${AMBER})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                klare Preise
              </span>
            </h2>
            <p
              className="mt-4 max-w-xl mx-auto"
              style={{ color: "rgba(255,228,188,0.47)", fontSize: 16 }}
            >
              Mit datengetriebenen Strategien holen wir gemeinsam das Maximum aus jedem Euro heraus.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              {
                name: "Content Growth",
                price: "€1.300",
                period: "mtl. exkl. MWSt.",
                features: [
                  "15 Content Pieces pro Monat",
                  "Betreuung deiner Social-Media Kanäle",
                  "1 Content Shoot pro Monat",
                  "24/7 Support bei deinen Fragen",
                ],
                highlight: false,
              },
              {
                name: "Content Advanced",
                price: "€2.600",
                period: "mtl. exkl. MWSt.",
                features: [
                  "30 Content Pieces pro Monat",
                  "Betreuung deiner Social-Media Kanäle",
                  "Kommentar-Management",
                  "2 Content Shoots pro Monat",
                  "24/7 Support deiner Fragen",
                  "Eigens erstelltes Content-Portal",
                ],
                highlight: true,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className="relative p-8 rounded-2xl"
                style={{
                  background: plan.highlight
                    ? "rgba(18, 14, 6, 0.75)"
                    : "rgba(12, 9, 4, 0.55)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: plan.highlight
                    ? `1px solid rgba(245,158,11,0.3)`
                    : "1px solid rgba(255,255,255,0.11)",
                  boxShadow: plan.highlight
                    ? `0 0 40px rgba(245,158,11,0.08), 0 12px 48px rgba(0,0,0,0.5)`
                    : "0 12px 48px rgba(0,0,0,0.4)",
                }}
              >
                {plan.highlight && (
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
                    style={{
                      background: `linear-gradient(135deg, ${AMBER}, ${AMBER_DARK})`,
                      color: "#0a0700",
                    }}
                  >
                    Beliebt
                  </div>
                )}

                <div className="mb-6">
                  <div
                    className="text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: "rgba(245,158,11,0.6)" }}
                  >
                    {plan.name}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black" style={{ color: "#fff" }}>
                      {plan.price}
                    </span>
                  </div>
                  <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {plan.period}
                  </div>
                </div>

                <div className="h-px mb-6" style={{ background: "rgba(255,255,255,0.06)" }} />

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                      <span className="mt-0.5 shrink-0" style={{ color: AMBER }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button className={plan.highlight ? "btn-primary w-full rounded-xl py-3.5" : "btn-outline w-full rounded-xl py-3.5"}>
                  Jetzt starten
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge>Testimonials</Badge>
            <h2
              className="mt-6 font-black"
              style={{
                fontSize: "clamp(28px, 3.5vw, 46px)",
                letterSpacing: "-0.03em",
              }}
            >
              Was unsere Kunden{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${AMBER_LIGHT}, ${AMBER})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                über uns sagen
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {[
              {
                text: "(n)ordinary studios ist keine gewöhnliche Content-Agentur – sie ist ein Full-Service-Partner, der mitdenkt, vorausschaut und on Location alles möglich macht. 100 % Einsatz, 100 % Qualität.",
                name: "Gerhard Moser",
                role: "Experte für mentale Gesundheit",
                stars: 5,
              },
              {
                text: "Durch genaueste Planung und Abstimmung gelang es das Projekt innerhalb kürzester Zeit umzusetzen. Die Betreuung vor sowie nach Projektabschluss ist super – die Bemühungen seitens des Teams sind zu jeder Zeit zu spüren.",
                name: "Mathias Tobel",
                role: "Produktmanager KAHLES",
                stars: 5,
              },
              {
                text: "Wir sind absolut begeistert von unserer neuen Homepage! Das Design ist modern, professionell und gleichzeitig sehr benutzerfreundlich. Schon jetzt erhalten wir viel positives Feedback.",
                name: "Erich Groß",
                role: "Geschäftsführer Zahnlabor Groß",
                stars: 5,
              },
            ].map((t, i) => (
              <GlowCard key={i} className="p-7" intensity={0.9}>
                <div className="flex gap-1 mb-4">
                  {Array(t.stars)
                    .fill(0)
                    .map((_, s) => (
                      <span key={s} style={{ color: AMBER, fontSize: 14 }}>
                        ★
                      </span>
                    ))}
                </div>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "rgba(255,228,188,0.6)" }}
                >
                  „{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${AMBER}, ${AMBER_DARK})`,
                      color: "#0a0700",
                    }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "#fff" }}>
                      {t.name}
                    </div>
                    <div className="text-xs" style={{ color: "rgba(255,228,188,0.38)" }}>
                      {t.role}
                    </div>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-28 px-6 relative overflow-hidden">
        <img
          src={`${BASE}amber-glow2.png`}
          aria-hidden="true"
          className="pointer-events-none absolute select-none"
          style={{
            right: "-5%",
            top: "50%",
            transform: "translateY(-50%)",
            width: 600,
            height: 600,
            objectFit: "cover",
            opacity: 0.09,
            maskImage: "radial-gradient(ellipse 70% 70% at 80% 50%, black 0%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 80% 50%, black 0%, transparent 100%)",
            mixBlendMode: "screen",
          }}
        />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <Badge>FAQ</Badge>
            <h2
              className="mt-6 font-black"
              style={{
                fontSize: "clamp(28px, 3.5vw, 46px)",
                letterSpacing: "-0.03em",
              }}
            >
              Häufig gestellte{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${AMBER_LIGHT}, ${AMBER})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Fragen
              </span>
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "Wie läuft die Zusammenarbeit ab?",
                a: "Wir starten mit einem kostenlosen Erstgespräch, analysieren deine Situation und entwickeln eine maßgeschneiderte Strategie. Nach deiner Freigabe beginnen wir sofort mit der Umsetzung.",
              },
              {
                q: "Wie schnell sehe ich erste Ergebnisse?",
                a: "Die ersten messbaren Ergebnisse siehst du typischerweise nach 4-8 Wochen. Langfristiges Wachstum und echte Community-Bindung entwickeln sich über 3-6 Monate.",
              },
              {
                q: "Welche Branchen betreut ihr?",
                a: "Wir arbeiten mit Unternehmen aus allen Branchen – von Dienstleistern und Shops bis hin zu Ärzten, Coaches und B2B-Unternehmen. Unsere Strategien passen wir individuell an.",
              },
              {
                q: "Was ist im Paketpreis enthalten?",
                a: "Strategie, Content-Erstellung, Planung, Posting, Community Management und monatliches Reporting sind standardmäßig enthalten. Paid Ads können optional hinzugebucht werden.",
              },
              {
                q: "Kann ich das Paket jederzeit kündigen?",
                a: "Unsere Pakete laufen mit einer dreimonatigen Mindestlaufzeit, danach monatlich kündbar. Wir sind überzeugt von unserer Arbeit und setzen auf langfristige Partnerschaften.",
              },
            ].map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-6 relative overflow-hidden">
        <div className="section-divider mx-0 mb-12" />
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-4 gap-8 mb-12">
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-black" style={{ letterSpacing: "-0.03em" }}>
                  <span style={{ color: AMBER }}>(n)</span>
                  <span style={{ color: "#fff" }}>ordinary</span>
                </span>
                <span className="text-xs uppercase tracking-widest" style={{ color: "rgba(255,228,188,0.35)" }}>
                  STUDIOS
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,228,188,0.38)" }}>
                Deine Social Media Agentur in Wien. Wir schaffen Sichtbarkeit, Reichweite und Wachstum.
              </p>
            </div>
            {[
              {
                title: "Leistungen",
                links: ["Social-Media Management", "Content Produktion", "Performance Marketing", "Webdesign"],
              },
              {
                title: "Unternehmen",
                links: ["Über uns", "Referenzen", "Blog", "Karriere"],
              },
              {
                title: "Kontakt",
                links: ["office@nordinary.at", "Wien, Österreich", "Erstgespräch buchen"],
              },
            ].map((col) => (
              <div key={col.title}>
                <div
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: "rgba(245,158,11,0.6)" }}
                >
                  {col.title}
                </div>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-xs transition-colors"
                        style={{ color: "rgba(255,228,188,0.42)", textDecoration: "none" }}
                        onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "rgba(255,228,188,0.8)")}
                        onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,228,188,0.42)")}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="section-divider mb-8" />

          <div className="flex items-center justify-between">
            <p className="text-xs" style={{ color: "rgba(255,228,188,0.28)" }}>
              © 2025 (n)ordinary Studios. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-5">
              {["Impressum", "Datenschutz", "AGB"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-xs"
                  style={{ color: "rgba(255,228,188,0.28)", textDecoration: "none" }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(12, 9, 4, 0.55)",
        backdropFilter: "blur(16px)",
        border: open ? "1px solid rgba(245,158,11,0.22)" : "1px solid rgba(255,255,255,0.08)",
        transition: "border-color 0.3s ease",
      }}
    >
      <button
        className="w-full flex items-center justify-between px-7 py-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-semibold pr-4" style={{ color: open ? "#fff" : "rgba(255,228,188,0.75)" }}>
          {q}
        </span>
        <span
          style={{
            color: AMBER,
            fontSize: 18,
            transition: "transform 0.3s ease",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            flexShrink: 0,
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-7 pb-6">
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,228,188,0.5)" }}>
            {a}
          </p>
        </div>
      )}
    </div>
  );
}
