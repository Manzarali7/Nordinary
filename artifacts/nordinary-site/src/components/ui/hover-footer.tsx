"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { brandLogoSrc } from "@/lib/brand-logo";

const AMBER = "#FFE947";

export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  const flushCursor = React.useCallback(() => {
    rafRef.current = null;
    const pending = pendingRef.current;
    if (!pending || !svgRef.current) return;
    pendingRef.current = null;
    const svgRect = svgRef.current.getBoundingClientRect();
    const cxPercentage = ((pending.x - svgRect.left) / svgRect.width) * 100;
    const cyPercentage = ((pending.y - svgRect.top) / svgRect.height) * 100;
    setMaskPosition({
      cx: `${cxPercentage}%`,
      cy: `${cyPercentage}%`,
    });
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    pendingRef.current = { x: e.clientX, y: e.clientY };
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(flushCursor);
    }
  };

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#80eeb4" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition as any}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.25"
        className="fill-transparent stroke-neutral-200 font-sans text-[52px] font-bold dark:stroke-neutral-800"
        style={{ opacity: 0.15 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.25"
        className="fill-transparent stroke-[#FFE947] font-sans text-[52px] font-bold 
        dark:stroke-[#FFE94799]"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        whileInView={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.25"
        mask="url(#textMask)"
        className="fill-transparent font-sans text-[52px] font-bold"
      >
        {text}
      </text>
    </svg>
  );
};


export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #0F0F1166 50%, rgba(255,233,71, 0.12) 100%)",
      }}
    />
  );
};

export default function HoverFooter() {
  // Footer link data
  const footerLinks = [
    {
      title: "Leistungen",
      links: [
        { label: "Social-Media Management", href: "#" },
        { label: "Content Produktion", href: "#" },
        { label: "Performance Marketing", href: "#" },
        { label: "Webdesign", href: "#" },
      ],
    },
    {
      title: "Über uns",
      links: [
        { label: "Team", href: "#" },
        { label: "Werte & Ansatz", href: "#" },
        { label: "Karriere", href: "#" },
        {
          label: "Live Chat",
          href: "#",
          pulse: true,
        },
      ],
    },
  ];

  // Contact info data
  const contactInfo = [
    {
      icon: <Mail size={18} className="text-[#FFE947]" />,
      text: "office@nordinary.at",
      href: "mailto:office@nordinary.at",
    },
    {
      icon: <Phone size={18} className="text-[#FFE947]" />,
      text: "+43 1 234 56 78",
      href: "tel:+4312345678",
    },
    {
      icon: <MapPin size={18} className="text-[#FFE947]" />,
      text: "Wien, Österreich",
    },
  ];

  // Social media icons
  const socialLinks = [
    { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
    { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "#" },
    { icon: <Globe size={20} />, label: "Web", href: "#" },
  ];

  return (
    <footer className="bg-[#0F0F11]/10 relative h-fit rounded-3xl overflow-hidden m-8 border border-white/5">
      {/* ── AMBER STROKE TOP ── */}
      <div
        className="absolute inset-x-0 top-0 z-20 pointer-events-none"
        style={{
          height: 1,
          background: `linear-gradient(90deg,
            transparent 0%,
            transparent 8%,
            rgba(255,233,71,0.15) 22%,
            rgba(255,233,71,0.38) 35%,
            rgba(252,211,77,0.5) 50%,
            rgba(255,233,71,0.38) 65%,
            rgba(255,233,71,0.15) 78%,
            transparent 92%,
            transparent 100%)`,
        }}
      />
      <div
        className="absolute inset-x-0 top-0 z-20 pointer-events-none"
        style={{
          height: 1,
          background: `linear-gradient(90deg,
            transparent 0%,
            transparent 8%,
            rgba(255,233,71,0.15) 22%,
            rgba(255,233,71,0.38) 35%,
            rgba(252,211,77,0.5) 50%,
            rgba(255,233,71,0.38) 65%,
            rgba(255,233,71,0.15) 78%,
            transparent 92%,
            transparent 100%)`,
          filter: "blur(4px)",
          opacity: 0.5,
        }}
      />
      <div className="max-w-7xl mx-auto p-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-5">
            <div className="flex items-center space-x-3">
              <img
                src={brandLogoSrc}
                alt="Nordinary"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-sm font-bold leading-relaxed text-muted-foreground">
              Nordinary Studios — Social Media Agentur Wien. <br />
              Strategie, Content & Performance für messbaren Erfolg.
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-lg font-semibold mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <a
                      href={link.href}
                      className="text-muted-foreground font-bold hover:text-[#FFE947] transition-colors"
                    >
                      {link.label}
                    </a>
                    {link.pulse && (
                      <span className="absolute top-1.5 left-[-12px] w-2 h-2 rounded-full bg-[#FFE947] animate-pulse"></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Kontakt
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-muted-foreground font-bold hover:text-[#FFE947] transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-muted-foreground font-bold hover:text-[#FFE947] transition-colors">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-white/10 my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          {/* Social icons */}
          <div className="flex space-x-6 text-gray-400">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-[#FFE947] transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center md:text-left text-muted-foreground font-bold">
            &copy; {new Date().getFullYear()} Nordinary studios. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>

      {/* Text hover effect */}
      <div className="lg:flex hidden h-[30rem] -mt-44 -mb-28 reveal">
        <TextHoverEffect text="Nordinary" className="z-50" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}
