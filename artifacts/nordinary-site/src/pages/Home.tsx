import { useEffect, useRef } from "react";
import Lenis from "lenis";


import { Header } from "@/components/ui/header-2";
import { LazyUnicornScene } from "@/components/ui/lazy-unicorn-scene";
import HoverFooter from "@/components/ui/hover-footer";
import { FAQSection } from "@/components/ui/faq-section";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}





import { HeroSection, LogosSection } from "@/components/ui/hero-1";
import GradualBlur from "@/components/ui/gradual-blur";
import { TimelineSection } from "@/components/ui/timeline-section";
import DigitalSerenityBackground from "@/components/ui/digital-serenity-animated-landing-page";
import { CustomCursor } from "@/components/ui/custom-cursor";
import Bucket from "@/components/ui/bucket";
import { TiltCard } from "@/components/ui/tilt-card";

const UNICORN_SDK = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.12/dist/unicornStudio.umd.js";

const AMBER = "#FFE947";
const AMBER_DARK = "#D4C13B";
const AMBER_LIGHT = "#FFF082";
const BASE = import.meta.env.BASE_URL;

function GlowCard({
  children,
  className = "",
  intensity = 1,
  highlight = false,
  variant = "amber",
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  highlight?: boolean;
  variant?: "amber" | "white";
}) {
  const isAmber = variant === "amber";
  const glowColor = isAmber ? "255,233,71" : "255,255,255";
  const glowShadow = isAmber ? "255,200,50" : "255,255,255";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        background: "#0d0d0d",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: highlight 
          ? `0 20px 80px rgba(${glowShadow},${isAmber ? 0.12 : 0.08}), inset 0 1px 0 rgba(255,255,255,0.03)`
          : `0 12px 48px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.03)`,
      }}
    >
      {/* ── TOP STROKE ── */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-20"
        style={{
          height: 2,
          background: `linear-gradient(90deg, 
            transparent 0%, 
            rgba(${glowColor},0.2) 20%, 
            rgba(${glowColor},0.8) 50%, 
            rgba(${glowColor},0.2) 80%, 
            transparent 100%)`,
          opacity: highlight ? 1 : 0.6,
        }}
      />

      {/* ── AMBIENT BOTTOM GLOW (Shifted Right & Saturated) ── */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
        style={{
          height: "45%",
          background: `radial-gradient(circle at 50% 100%, 
            #ffffff 0%, 
            rgba(${glowColor},${isAmber ? 0.4 : 0.2}) 25%, 
            rgba(${glowColor},${isAmber ? 0.15 : 0.08}) 55%, 
            transparent 85%)`,
          filter: "blur(35px)",
          opacity: highlight ? 1 : 0.7,
        }}
      />



      {/* ── BOTTOM STROKE ── */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20"
        style={{
          height: 3,
          background: `linear-gradient(90deg,
            transparent 0%,
            transparent 8%,
            rgba(${glowColor},${0.07 * intensity}) 22%,
            rgba(${glowColor},${0.14 * intensity}) 42%,
            rgba(${glowColor},${0.16 * intensity}) 50%,
            rgba(${glowColor},${0.14 * intensity}) 58%,
            rgba(${glowColor},${0.07 * intensity}) 78%,
            transparent 92%,
            transparent 100%)`,
          borderRadius: "0 0 2px 2px",
        }}
      />
      {/* ── INNER BORDER ── */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl z-20"
        style={{ border: "1px solid rgba(255,255,255,0.07)" }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}



function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
      style={{
        background: "linear-gradient(135deg, rgba(255,233,71,0.14) 0%, rgba(255,233,71,0.07) 100%)",
        border: "1px solid rgba(255,233,71,0.32)",
        color: AMBER_LIGHT,
        boxShadow: "0 0 20px rgba(255,233,71,0.12), inset 0 1px 0 rgba(255,235,120,0.15)",
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
          boxShadow: `0 0 8px ${AMBER}, 0 0 16px rgba(255,233,71,0.5)`,
        }}
      />
      {children}
    </span>
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
        height: size,
        background: `radial-gradient(circle at 50% 50%,
          rgba(255,210,0,${0.65 * opacity}) 0%,
          rgba(255,233,71,${0.38 * opacity}) 25%,
          rgba(200,130,0,${0.12 * opacity}) 55%,
          transparent 75%)`,
        filter: `blur(${size / 14}px)`,
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
      {/* Radiating rays */}
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
              rgba(255,233,71,${0.3 * opacity}) 40%,
              transparent 100%)`,
            filter: "blur(2px)",
          }}
        />
      ))}
      {/* Thin cross beams */}
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
      {/* Bright center spot */}
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
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,
      wheelMultiplier: 1,
      infinite: false,
    });

    // Synchronize Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Global reveal animation
    const ctx = gsap.context(() => {
      // reveal staggered logic
      const revealContainers = document.querySelectorAll('.reveal-container');
      revealContainers.forEach(container => {
        const reveals = container.querySelectorAll('.reveal');
        gsap.fromTo(reveals, 
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

      // Individual reveals for items NOT in a container
      const individualReveals = document.querySelectorAll('.reveal:not(.reveal-container .reveal)');
      individualReveals.forEach(el => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    });
 // Initial refresh to ensure ScrollTrigger knows the positions
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative font-sans text-white">
      <CustomCursor />
      <DigitalSerenityBackground />
      <Header />
      <div
        className="relative overflow-x-hidden text-white"
      >
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,233,71,0.3); }
          50% { box-shadow: 0 0 40px rgba(255,233,71,0.6), 0 0 80px rgba(255,233,71,0.2); }
        }

        @media (prefers-reduced-motion: reduce) {
          .btn-primary { animation: none; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fadeup { animation: fadeUp 0.7s ease forwards; }



        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .btn-primary {
          background-size: 200% auto;
        }

        .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,233,71,0.15) 10%, rgba(255,233,71,0.38) 35%, rgba(252,211,77,0.5) 50%, rgba(255,233,71,0.38) 65%, rgba(255,233,71,0.15) 90%, transparent);
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
        ::-webkit-scrollbar-thumb { background: rgba(255,233,71,0.3); border-radius: 2px; }

        /* ── Hide Unicorn Studio watermark ── */
        [data-us-project] ~ a,
        canvas ~ a,
        a[href*="unicorn.studio"],
        a[href*="unicornstudio"],
        div[style*="unicorn"] a,
        .unicorn-studio-attribution { display: none !important; }

        .reveal { opacity: 0; }
      `}</style>
      
      <HeroSection />

      {/* ── ABOUT ── */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="reveal"><Badge>Wir sind nicht 0815. Wir lösen Probleme.</Badge></div>
            <h2
              className="mt-6 font-sans font-semibold leading-tight text-gradient-display tracking-tight reveal"
              style={{
                fontSize: "clamp(28px, 3.5vw, 46px)",
                letterSpacing: "normal",
              }}
            >
              Nordinary studios schafft Wirkung für Ihr Unternehmen.
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed text-muted-foreground reveal">
              Wir haben unzählige Kampagnen konzipiert und umgesetzt, die nicht nur Reichweite
              generierten, sondern echte Verbindungen geschafft haben. Von kreativen
              Content-Strategien über präzises Targeting bis hin zur Performance-Analyse –
              wir kombinieren Kreativität mit datenbasiertem Denken.
            </p>
            <div className="reveal">
              <Button variant="solid" size="lg" className="mt-8">
                Mehr erfahren
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { val: "50+", label: "Unternehmen in Österreich vertrauen uns" },
              { val: "100%", label: "Einsatz bei jedem Projekt" },
              { val: "3+", label: "Jahre Agenturerfahrung" },
              { val: "∞", label: "Kreativität ohne Grenzen" },
            ].map((stat, i) => (
            <div key={i} className="reveal">
              <TiltCard className="h-full">
                <GlowCard className="h-full p-6 text-center" intensity={0.8}>
                  <div className="text-4xl font-bold mb-2 text-white tracking-tight">
                    {stat.val}
                  </div>
                  <div className="text-xs font-normal leading-snug text-muted-foreground">{stat.label}</div>
                </GlowCard>
              </TiltCard>
            </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── SERVICES ── */}
      <section className="py-28 px-6 relative overflow-hidden" id="services">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255,233,71,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Bucket Component */}
            <div className="w-full reveal">
              <Bucket />
            </div>
            
            {/* Right: Text about the agency */}
            <div className="space-y-6">
              <div className="reveal"><Badge>Über uns</Badge></div>
              <h2
                className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] reveal"
              >
                Kreativität trifft auf <br/>
                <span className="text-neutral-400">Performance.</span>
              </h2>
              <p className="mt-4 font-normal leading-relaxed text-neutral-400 text-lg max-w-lg reveal">
                Wir sind eine inhabergeführte Social-Media-Agentur aus Wien, die sich darauf spezialisiert hat, Marken nicht nur sichtbar, sondern unverwechselbar zu machen.
              </p>
              <p className="font-normal leading-relaxed text-neutral-400 text-lg max-w-lg reveal">
                Mit einem klaren Fokus auf messbare Ergebnisse kombinieren wir strategisches Denken mit herausragendem Design und modernster Technologie. Unser Ziel? Dein Wachstum nachhaltig zu beschleunigen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-16" />

      {/* ── LEISTUNGEN TIMELINE ── */}
      <section className="relative py-28 overflow-hidden">
        {/* Right amber glow — natural aspect ratio, fades left + top + bottom */}
        <img
          src={`${BASE}gold-particles.jpeg`}
          aria-hidden="true"
          className="pointer-events-none absolute select-none"
          style={{
            left: 0,
            top: 80,
            width: 340,
            height: 340,
            objectFit: "cover",
            objectPosition: "right center",
            opacity: 0.28,
            maskImage: [
              "linear-gradient(to right,  black 0%, black 35%, transparent 100%)",
              "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
              "linear-gradient(to top,    black 0%, black 65%, transparent 100%)",
            ].join(", "),
            WebkitMaskImage: [
              "linear-gradient(to right,  black 0%, black 35%, transparent 100%)",
              "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
              "linear-gradient(to top,    black 0%, black 65%, transparent 100%)",
            ].join(", "),
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
            mixBlendMode: "screen",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="text-center mb-20 reveal">
            <Badge>Unsere Leistungen</Badge>
            <h2
              className="mt-6 font-sans font-semibold text-gradient-display tracking-tight"
              style={{
                fontSize: "clamp(30px, 4vw, 52px)",
                letterSpacing: "normal",
              }}
            >
              Im Detail – was wir für dich tun
            </h2>
          </div>

          <TimelineSection />
        </div>
      </section>

      <div className="section-divider mx-16" />

      {/* ── PAIN POINTS ── */}
      <section className="py-28 px-6 relative overflow-hidden">
        {/* Amber ambient glow — center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,233,71,0.05) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 reveal">
            <Badge>Herausforderungen</Badge>
            <h2
              className="mt-6 font-sans font-semibold text-gradient-display tracking-tight"
              style={{
                fontSize: "clamp(28px, 3.5vw, 46px)",
                letterSpacing: "normal",
              }}
            >
              Die meisten Unternehmer treffen auf diese Herausforderungen
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-5 reveal-container">
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
            <div key={i} className="reveal">
              <TiltCard className="h-full">
                <GlowCard className="h-full p-7" intensity={1}>
                  <div
                    className="text-3xl mb-5 w-12 h-12 flex items-center justify-center rounded-xl"
                    style={{ background: "rgba(255,233,71,0.08)" }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="mb-3 text-base font-bold leading-snug text-foreground">{item.q}</h3>
                  <p className="text-sm font-normal leading-relaxed text-muted-foreground">{item.a}</p>
                </GlowCard>
              </TiltCard>
            </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY SOCIAL MEDIA ── */}
      <section
        className="py-28 px-6 relative overflow-hidden"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,233,71,0.05) 0%, transparent 70%)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal">
            <Badge>Warum Social Media?</Badge>
            <h2
              className="mt-6 font-sans font-semibold text-gradient-display tracking-tight"
              style={{
                fontSize: "clamp(28px, 3.5vw, 46px)",
                letterSpacing: "normal",
              }}
            >
              Vom ersten Blick bis zum Kaufabschluss
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-5 reveal-container">
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
            <div key={i} className="reveal">
              <TiltCard className="h-full">
                <GlowCard 
                  className="h-full p-8 text-center" 
                  intensity={1} 
                  highlight={true}
                  variant="amber"
                >
                  <div
                    className="text-xs font-bold uppercase tracking-widest mb-4"
                    style={{ color: "rgba(255,233,71,0.5)" }}
                  >
                    Schritt {item.step}
                  </div>
                  <div
                    className="text-6xl font-bold mb-4"
                    style={{
                      background: `linear-gradient(135deg, rgba(255,233,71,0.15), rgba(255,233,71,0.05))`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      lineHeight: 1,
                    }}
                  >
                    {item.step}
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm font-normal leading-relaxed text-muted-foreground">{item.desc}</p>
                </GlowCard>
              </TiltCard>
            </div>
            ))}
          </div>
        </div>
      </section>





      {/* ── TESTIMONIALS ── */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal">
            <Badge>Testimonials</Badge>
            <h2
              className="mt-6 font-sans font-semibold text-gradient-display tracking-tight"
              style={{
                fontSize: "clamp(28px, 3.5vw, 46px)",
                letterSpacing: "normal",
              }}
            >
              Was unsere Partner über uns sagen
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-5 reveal-container">
            {[
              {
                text: "Nordinary studios ist keine gewöhnliche Content-Agentur – sie ist ein Full-Service-Partner, der mitdenkt, vorausschaut und on Location alles möglich macht. 100 % Einsatz, 100 % Qualität.",
                name: "Gerhard Moser",
                role: "Experte für mentale Gesundheit",
                stars: 5,
                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop"
              },
              {
                text: "Durch genaueste Planung und Abstimmung gelang es das Projekt innerhalb kürzester Zeit umzusetzen. Die Betreuung vor sowie nach Projektabschluss ist super – die Bemühungen seitens des Teams sind zu jeder Zeit zu spüren.",
                name: "Mathias Tobel",
                role: "Produktmanager KAHLES",
                stars: 5,
                img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&h=150&auto=format&fit=crop"
              },
              {
                text: "Wir sind absolut begeistert von unserer neuen Homepage! Das Design ist modern, professionell und gleichzeitig sehr benutzerfreundlich. Schon jetzt erhalten wir viel positives Feedback.",
                name: "Erich Groß",
                role: "Geschäftsführer Zahnlabor Groß",
                stars: 5,
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop"
              },
            ].map((t, i) => (
            <div key={i} className="reveal">
              <TiltCard className="h-full">
                <GlowCard 
                  className="h-full p-7" 
                  intensity={1} 
                  highlight={i === 1}
                  variant={i === 1 ? "amber" : "white"}
                >
                <div className="flex gap-1 mb-4">
                  {Array(t.stars)
                    .fill(0)
                    .map((_, s) => (
                      <span key={s} style={{ color: AMBER, fontSize: 14 }}>
                        ★
                      </span>
                    ))}
                </div>
                <p className="mb-6 text-sm font-normal leading-relaxed text-muted-foreground">
                  „{t.text}“
                </p>
                <div
                  className="h-px mb-5"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
                <div className="flex items-center gap-3">
                  <img 
                    src={t.img} 
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="text-xs font-normal text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </GlowCard>
            </TiltCard>
            </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />

      <div className="bg-[#080808] relative z-10">
        {/* ── CTA SECTION ── */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
          />
          <div
            className="max-w-6xl mx-auto text-center relative rounded-3xl overflow-hidden"
            style={{
              border: "1px solid rgba(255,255,255,0.11)",
              background: "#080808",
            }}
          >
            {/* Ambient Background - Unicorn Studio Scene */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
              <LazyUnicornScene 
                projectId="UC9oKoDWjxF2spKEmVE1" 
                sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.12/dist/unicornStudio.umd.js"
                width="100%" 
                height="100%" 
              />
            </div>
            {/* Dark overlay so text stays readable */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: "rgba(8,6,2,0.55)",
              }}
            />
            {/* Content */}
            <div className="relative z-20 px-16 py-20">
              <div className="reveal"><Badge>Schreib' uns noch heute!</Badge></div>
              <h2
                className="mt-6 font-sans font-semibold text-gradient-display tracking-tight reveal"
                style={{
                  fontSize: "clamp(28px, 4vw, 52px)",
                  letterSpacing: "normal",
                }}
              >
                Worauf willst du noch warten?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-[17px] font-normal leading-relaxed text-muted-foreground reveal">
                Jeder Tag ohne professionelle Social-Media-Inhalte{" "}
                <strong className="font-semibold text-foreground/90">
                  kostet dich Sichtbarkeit, Reichweite und Kunden
                </strong>
                . Handle jetzt – bevor es deine Mitbewerber tun.
              </p>
              <div className="reveal">
                <Button variant="solid" size="lg" className="mt-8">
                  Erstgespräch vereinbaren
                </Button>
              </div>
            </div>
          </div>
        </section>

        <HoverFooter />
      </div>


      <GradualBlur
        target="page"
        position="bottom"
        height="5rem"
        strength={2}
        divCount={4}
        curve="ease-out"
        exponential={false}
        opacity={0.92}
      />
      </div>
    </div>
  );
}
