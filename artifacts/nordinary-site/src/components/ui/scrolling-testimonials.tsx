"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const AMBER = "#FFE947";

const testimonials = [
  {
    text: "Nordinary Studios hat unser Social Media Game komplett verändert. Die Reels sind Weltklasse!",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Operations Manager",
  },
  {
    text: "Die Zusammenarbeit ist so simpel und intuitiv, wir waren in 10 Minuten startklar.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "IT Manager",
  },
  {
    text: "Ich bin begeistert von der neuen Homepage! Design und Performance sind top.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "Customer Support Lead",
  },
  {
    text: "Strategie, Content & Performance – hier bekommt man alles aus einer Hand.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "CEO",
  },
  {
    text: "Absolut empfehlenswert! Die kreative Energie des Teams ist ansteckend.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "Project Manager",
  },
  {
    text: "Die Ergebnisse sprechen für sich. Unser Engagement ist um 300% gestiegen.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aliza Khan",
    role: "Business Analyst",
  },
  {
    text: "Professionell, pünktlich und extrem kreativ. Genau das, was wir gesucht haben.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Farhan Siddiqui",
    role: "Marketing Director",
  },
  {
    text: "Nordinary Studios ist kein gewöhnlicher Partner – sie sind Teil unseres Teams.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sana Sheikh",
    role: "Sales Manager",
  },
  {
    text: "Die Paid Ads Kampagnen haben einen messbaren Impact auf unser Wachstum.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Hassan Ali",
    role: "E-commerce Manager",
  },
];

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div 
                    className="p-8 rounded-3xl border shadow-xl max-w-xs w-full relative overflow-hidden" 
                    key={i}
                    style={{
                        background: "rgba(16, 11, 3, 0.52)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.11)",
                        boxShadow: `0 12px 48px rgba(0,0,0,0.65)`,
                    }}
                >
                    {/* Top line glow */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFE947]/40 to-transparent" />
                    
                    <div className="text-sm font-normal leading-relaxed text-muted-foreground italic mb-6">
                        "{text}"
                    </div>
                    <div className="flex items-center gap-3 mt-5">
                        <div className="h-10 w-10 rounded-full overflow-hidden border border-[#FFE947]/30">
                            <img
                                width={40}
                                height={40}
                                src={image}
                                alt={name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="text-sm font-bold tracking-tight text-white">{name}</div>
                            <div className="text-xs opacity-60 tracking-tight text-[#FFE947]/80">{role}</div>
                        </div>
                    </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);


export const ScrollingTestimonials = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(circle at 50% 50%, rgba(255,233,71, 0.03) 0%, transparent 80%)"
      }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto text-center mb-16">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-6"
            style={{
                background: "rgba(255,233,71,0.08)",
                border: "1px solid rgba(255,233,71,0.25)",
                color: AMBER,
            }}
          >
            Testimonials
          </span>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">
            Was unsere Kunden über uns sagen
          </h2>
          <p className="mt-5 text-muted-foreground">
            Entdecke, wie wir Unternehmen dabei helfen, ihre digitale Präsenz zu transformieren und echtes Wachstum zu erzielen.
          </p>
        </div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};
