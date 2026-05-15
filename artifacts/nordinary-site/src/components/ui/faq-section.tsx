"use client";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const AMBER = "#FFE947";
const AMBER_LIGHT = "#FCD34D";

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

const FAQ_ITEMS = [
  {
    question: "Welche Plattformen betreut (n)ordinary studios?",
    answer: "Wir betreuen alle relevanten Kanäle: Instagram, Facebook, LinkedIn, TikTok und YouTube. Dabei entwickeln wir für jede Plattform eine maßgeschneiderte Content- und Wachstumsstrategie.",
  },
  {
    question: "Bietet ihr auch Content-Produktion vor Ort an?",
    answer: "Ja, wir sind mobil und produzieren hochwertigen Foto- und Video-Content direkt bei euch vor Ort oder in unserem Studio in Wien, um maximale Authentizität zu gewährleisten.",
  },
  {
    question: "Wie startet eine Zusammenarbeit mit euch?",
    answer: "Alles beginnt mit einem kostenlosen Erstgespräch. Wir analysieren euren Ist-Zustand, definieren gemeinsam Ziele und erstellen daraufhin ein individuelles Konzept.",
  },
  {
    question: "Arbeitet ihr auch mit KI-gestützten Tools?",
    answer: "Absolut. Wir nutzen modernste KI-Automatisierungen, um Prozesse zu beschleunigen und die Effizienz eurer Kampagnen nachhaltig zu steigern.",
  },
  {
    question: "Gibt es monatliche Berichte über die Performance?",
    answer: "Ja, Transparenz ist uns wichtig. Ihr erhaltet detaillierte monatliche Reportings mit allen relevanten Kennzahlen (KPIs) und Handlungsempfehlungen.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-28 px-4 md:px-6 overflow-visible">
      {/* Glow behind the shape */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(50% 50% at 50% 0%, rgba(255,233,71, 0.25) 0%, transparent 100%)",
          filter: "blur(80px)",
        }}
      />
      
      {/* Blurred stroke (glow) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          borderRadius: "100px 100px 0 0",
          background: `linear-gradient(transparent, transparent) padding-box,
            linear-gradient(90deg,
              transparent 0%,
              transparent 8%,
              rgba(255,233,71,0.15) 22%,
              rgba(255,233,71,0.38) 35%,
              rgba(252,211,77,0.5) 50%,
              rgba(255,233,71,0.38) 65%,
              rgba(255,233,71,0.15) 78%,
              transparent 92%,
              transparent 100%) border-box`,
          border: "1px solid transparent",
          borderBottom: "none",
          filter: "blur(4px)",
          opacity: 0.5,
        }}
      />
      
      {/* The "Shape" - curved top section background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          borderRadius: "100px 100px 0 0",
          background: `linear-gradient(#080808, #080808) padding-box,
            linear-gradient(90deg,
              transparent 0%,
              transparent 8%,
              rgba(255,233,71,0.15) 22%,
              rgba(255,233,71,0.38) 35%,
              rgba(252,211,77,0.5) 50%,
              rgba(255,233,71,0.38) 65%,
              rgba(255,233,71,0.15) 78%,
              transparent 92%,
              transparent 100%) border-box`,
          border: "1px solid transparent",
          borderBottom: "none",
          boxShadow: "0 -20px 40px -20px rgba(255,233,71, 0.1)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Header */}
          <div className="space-y-6 reveal">
            <Badge>• How We Work?</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Frequently <br />
              <span className="text-neutral-400">Asked Questions</span>
            </h2>
            <p className="text-lg text-neutral-400 max-w-md leading-relaxed">
              Have questions? Our FAQ section has you covered with quick answers to the most common inquiries.
            </p>
          </div>

          {/* Right Side: Accordion */}
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <div 
                key={index}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border transition-all duration-300 reveal",
                  openIndex === index 
                    ? "border-[#FFE947]/30 bg-[#FFE947]/5" 
                    : "border-white/5 bg-[#0F0F11]/50 hover:border-white/10"
                )}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={cn(
                    "text-lg font-medium transition-colors",
                    openIndex === index ? "text-[#FFE947]" : "text-neutral-200 group-hover:text-white"
                  )}>
                    {item.question}
                  </span>
                  <div className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full border transition-all",
                    openIndex === index 
                      ? "border-[#FFE947] bg-[#FFE947] text-black" 
                      : "border-white/10 text-white group-hover:border-white/30"
                  )}>
                    {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-neutral-400 leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
