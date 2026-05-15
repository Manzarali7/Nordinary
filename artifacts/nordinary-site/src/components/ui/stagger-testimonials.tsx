"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";

const SQRT_5000 = Math.sqrt(5000);

const AMBER = "#FFE947";
const AMBER_LIGHT = "#FCD34D";

const testimonials = [
  {
    tempId: 0,
    testimonial: "Nordinary Studios hat unser Social Media Game komplett verändert. Die Reels sind Weltklasse!",
    by: "Gerhard Moser, CEO",
    imgSrc: "https://i.pravatar.cc/150?img=1"
  },
  {
    tempId: 1,
    testimonial: "Die Zusammenarbeit ist so simpel und intuitiv, wir waren in 10 Minuten startklar.",
    by: "Dan, CTO at SecureNet",
    imgSrc: "https://i.pravatar.cc/150?img=2"
  },
  {
    tempId: 2,
    testimonial: "Ich bin begeistert von der neuen Homepage! Design und Performance sind top.",
    by: "Stephanie, COO at InnovateCo",
    imgSrc: "https://i.pravatar.cc/150?img=3"
  },
  {
    tempId: 3,
    testimonial: "Strategie, Content & Performance – hier bekommt man alles aus einer Hand.",
    by: "Marie, CFO at FuturePlanning",
    imgSrc: "https://i.pravatar.cc/150?img=4"
  },
  {
    tempId: 4,
    testimonial: "Wenn ich 11 Sterne geben könnte, würde ich 12 geben. Absolut empfehlenswert!",
    by: "Andre, Head of Design",
    imgSrc: "https://i.pravatar.cc/150?img=5"
  },
  {
    tempId: 5,
    testimonial: "Beste Social Media Agentur in Wien. Punkt.",
    by: "Jeremy, Product Manager",
    imgSrc: "https://i.pravatar.cc/150?img=6"
  },
  {
    tempId: 6,
    testimonial: "Die ROI ist einfach unglaublich. Jeden Cent wert.",
    by: "Pam, Marketing Director",
    imgSrc: "https://i.pravatar.cc/150?img=7"
  },
  {
    tempId: 7,
    testimonial: "Professionell, kreativ und extrem schnell in der Umsetzung.",
    by: "Daniel, Data Scientist",
    imgSrc: "https://i.pravatar.cc/150?img=8"
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border transition-all duration-500 ease-in-out p-8 overflow-hidden",
        isCenter 
          ? "z-10 bg-[#120E06] border-[#FFE947]/50 shadow-[0_0_50px_rgba(255,233,71,0.15)]" 
          : "z-0 bg-[#0F0F11]/80 border-white/10 opacity-40 hover:opacity-100 hover:border-[#FFE947]/30"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
      }}
    >
        {/* Glow effect for center card */}
        {isCenter && (
            <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(circle at 50% 0%, rgba(255,233,71, 0.2) 0%, transparent 70%)"
            }} />
        )}

      {/* The decorative line at the cut corner */}
      <span
        className="absolute block origin-top-right rotate-45"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 1,
          background: isCenter ? AMBER : "rgba(255,255,255,0.1)"
        }}
      />
      
      <div className="relative z-10">
        <div className="mb-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full overflow-hidden border border-[#FFE947]/30">
                <img
                    src={testimonial.imgSrc}
                    alt={`${testimonial.by.split(',')[0]}`}
                    className="h-full w-full object-cover"
                />
            </div>
            <div>
                <p className={cn(
                    "text-sm font-bold",
                    isCenter ? "text-[#FFE947]" : "text-white/70"
                )}>
                    {testimonial.by}
                </p>
                <div className="flex gap-0.5 mt-0.5">
                    {[1,2,3,4,5].map(s => (
                        <span key={s} className="text-[10px]" style={{ color: AMBER }}>★</span>
                    ))}
                </div>
            </div>
        </div>
        
        <h3 className={cn(
          "text-lg sm:text-xl font-medium leading-relaxed",
          isCenter ? "text-white" : "text-white/60"
        )}>
          "{testimonial.testimonial}"
        </h3>
      </div>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-[#080808] py-20"
      style={{ height: 750 }}
    >
        <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,233,71, 0.05) 0%, transparent 80%)"
        }} />

      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}

      <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleMove(-1)}
          className="h-12 w-12 rounded-full border-white/10 bg-white/5 text-white hover:bg-[#FFE947] hover:text-black hover:border-[#FFE947]"
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleMove(1)}
          className="h-12 w-12 rounded-full border-white/10 bg-white/5 text-white hover:bg-[#FFE947] hover:text-black hover:border-[#FFE947]"
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};
