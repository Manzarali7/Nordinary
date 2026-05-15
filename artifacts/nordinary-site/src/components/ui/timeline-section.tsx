"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Share2, Camera, TrendingUp, Monitor, Sparkles } from "lucide-react";
import BorderGlow from "./BorderGlow";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AMBER = "#FFE947";
const AMBER_DARK = "#E6C800";

// ── Re-usable card components ────────────────────────────────────────────────



// ── Timeline data ─────────────────────────────────────────────────────────────

const STEPS = [
  {
    num: "01",
    title: "Social-Media Management",
    tag: "Management",
    items: [
      "Strategische Content-Planung & Redaktionskalender",
      "Professionelles Community Management",
      "Plattformbetreuung (Instagram, TikTok, LinkedIn)",
      "Monatliches Reporting & Performance-Analyse",
      "Laufende Strategie-Optimierung",
    ],
    left: false,
  },
  {
    num: "02",
    title: "Content Produktion",
    tag: "Produktion",
    items: [
      "Professionelle Foto- & Videoproduktion vor Ort",
      "Reel- & Short-Form-Video-Erstellung",
      "Skript-Writing & kreative Konzeption",
      "Professioneller Videoschnitt & Motion Graphics",
      "Thumbnail- & Grafikdesign",
    ],
    left: true,
  },
  {
    num: "03",
    title: "Performance Marketing",
    tag: "Paid Ads",
    items: [
      "Meta Ads (Facebook & Instagram Kampagnen)",
      "Google Ads & YouTube Werbung",
      "Zielgruppen-Analyse & Targeting",
      "A/B-Testing & Creatives-Optimierung",
      "Conversion-Tracking & ROI-Reporting",
    ],
    left: false,
  },
  {
    num: "04",
    title: "Webdesign",
    tag: "Web",
    items: [
      "Individuelle Website-Konzeption & UX Design",
      "Shopify- & Webflow-Entwicklung",
      "Mobile-First & responsives Design",
      "SEO-Grundoptimierung & Ladezeit-Tuning",
      "Laufende Wartung & technischer Support",
    ],
    left: true,
  },
  {
    num: "05",
    title: "Grafikdesign",
    tag: "Branding",
    items: [
      "Maßgeschneidertes Logo- & Corporate Design",
      "Digitale Werbemittel & Social Media Vorlagen",
      "Printmedien & Geschäftsausstattung",
      "Brand Styleguides & Visual Identity",
      "Illustrationen & kreatives Branding",
    ],
    left: false,
  },
];

const ICONS = [
  <Share2  size={64} strokeWidth={1} color="#FFFFFF" opacity={1} />,
  <Camera  size={64} strokeWidth={1} color="#FFFFFF" opacity={1} />,
  <TrendingUp size={64} strokeWidth={1} color="#FFFFFF" opacity={1} />,
  <Monitor size={64} strokeWidth={1} color="#FFFFFF" opacity={1} />,
  <Sparkles size={64} strokeWidth={1} color="#FFFFFF" opacity={1} />,
];

// ── Main Component ────────────────────────────────────────────────────────────

export function TimelineSection() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const lineTrackRef = useRef<HTMLDivElement>(null);   // static background line
  const lineFillRef  = useRef<HTMLDivElement>(null);   // animated fill line
  const rowRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {


      // 1. Draw the vertical line from top → bottom as we scroll
      gsap.fromTo(
        lineFillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: lineTrackRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        }
      );

      // 2. Each row: number node + card slide in as line reaches them
      STEPS.forEach((step, i) => {
        const row  = rowRefs.current[i];
        const node = nodeRefs.current[i];
        const card = cardRefs.current[i];
        if (!row) return;

        const cardDir = step.left ? -60 : 60; // slide from opposite side

        // Node pops in
        gsap.fromTo(
          node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: row,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Card slides + fades in
        gsap.fromTo(
          card,
          { x: cardDir, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative">
      {/* Timeline grid */}
      <div className="relative">
        {/* Background track line (always visible, very faint) */}
        <div
          ref={lineTrackRef}
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 pointer-events-none"
          style={{ width: 1, background: "rgba(255,233,71,0.08)" }}
        />

        {/* Animated fill line */}
        <div
          ref={lineFillRef}
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 pointer-events-none origin-top"
          style={{
            width: 4,
            scaleY: 0,
            borderRadius: 4,
            background: `linear-gradient(to bottom,
              transparent,
              rgba(255,233,71,0.8) 8%,
              rgba(252,211,77,1) 50%,
              rgba(255,233,71,0.8) 92%,
              transparent)`,
            boxShadow: "0 0 16px rgba(255,233,71,0.8)",
          }}
        />

        {STEPS.map((step, i) => (
          <div
            key={i}
            ref={(el) => { rowRefs.current[i] = el; }}
            className="relative grid grid-cols-2 gap-8 mb-48 items-center"
          >
            {/* Animated number node */}
            <div
              ref={(el) => { nodeRefs.current[i] = el; }}
              className="absolute left-1/2 -translate-x-1/2 z-20 flex items-center justify-center rounded-full font-bold text-sm"
              style={{
                width: 44,
                height: 44,
                background: `linear-gradient(135deg, ${AMBER}, ${AMBER_DARK})`,
                color: "#0a0700",
                boxShadow: `0 0 20px rgba(255,233,71,0.5), 0 0 40px rgba(255,233,71,0.2)`,
                opacity: 0,
                scale: "0",
              }}
            >
              {step.num}
            </div>

            {/* Left cell */}
            <div className={step.left ? "" : "flex justify-end"}>
              {step.left ? (
                <div ref={(el) => { if (!step.left || step.left) cardRefs.current[i] = el; }}>
                  <BorderGlow className="w-full" borderRadius={16} glowIntensity={0.25} fillOpacity={0.1} glowRadius={15} coneSpread={12}>
                    <div className="p-7 relative overflow-hidden group">
                      <div 
                        className="absolute -bottom-2 -right-2 w-20 h-20 opacity-[0.03] pointer-events-none group-hover:opacity-[0.06] transition-opacity"
                        style={{
                          backgroundImage: `radial-gradient(${AMBER} 1px, transparent 1px)`,
                          backgroundSize: "8px 8px",
                          maskImage: "radial-gradient(circle at bottom right, black, transparent 70%)",
                          WebkitMaskImage: "radial-gradient(circle at bottom right, black, transparent 70%)",
                        }}
                      />
                      <div className="relative z-10">
                      <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: AMBER, opacity: 0.7 }}>
                        {step.tag}
                      </div>
                      <h3 className="mb-4 text-xl font-bold tracking-tight text-white">{step.title}</h3>
                      <ul className="space-y-2">
                        {step.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm font-normal text-neutral-400">
                            <span style={{ color: AMBER, marginTop: 2, flexShrink: 0 }}>✦</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </BorderGlow>
                </div>
              ) : (
                <div
                  className="w-36 h-36 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(255,233,71,0.04)", border: "1px solid rgba(255,233,71,0.1)" }}
                >
                  <span style={{ animation: "float 4s ease-in-out infinite", animationDelay: `${i * -1.2}s` }}>{ICONS[i]}</span>
                </div>
              )}
            </div>

            {/* Right cell */}
            <div className={step.left ? "flex justify-start" : ""}>
              {step.left ? (
                <div
                  className="w-36 h-36 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(255,233,71,0.04)", border: "1px solid rgba(255,233,71,0.1)" }}
                >
                  <span style={{ animation: "float 4s ease-in-out infinite", animationDelay: `${i * -1.2}s` }}>{ICONS[i]}</span>
                </div>
              ) : (
                <div ref={(el) => { cardRefs.current[i] = el; }}>
                  <BorderGlow className="w-full" borderRadius={16} glowIntensity={0.25} fillOpacity={0.1} glowRadius={15} coneSpread={12}>
                    <div className="p-7 relative overflow-hidden group">
                      <div 
                        className="absolute -bottom-2 -right-2 w-20 h-20 opacity-[0.03] pointer-events-none group-hover:opacity-[0.06] transition-opacity"
                        style={{
                          backgroundImage: `radial-gradient(${AMBER} 1px, transparent 1px)`,
                          backgroundSize: "8px 8px",
                          maskImage: "radial-gradient(circle at bottom right, black, transparent 70%)",
                          WebkitMaskImage: "radial-gradient(circle at bottom right, black, transparent 70%)",
                        }}
                      />
                      <div className="relative z-10">
                      <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: AMBER, opacity: 0.7 }}>
                        {step.tag}
                      </div>
                      <h3 className="mb-4 text-xl font-bold tracking-tight text-white">{step.title}</h3>
                      <ul className="space-y-2">
                        {step.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm font-normal text-neutral-400">
                            <span style={{ color: AMBER, marginTop: 2, flexShrink: 0 }}>✦</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </BorderGlow>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
