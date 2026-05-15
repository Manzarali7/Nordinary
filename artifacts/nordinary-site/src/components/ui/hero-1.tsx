"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RocketIcon, ArrowRightIcon, PhoneCallIcon } from "lucide-react";
import { LogoCloud } from "@/components/ui/logo-cloud-3";
import { LazyUnicornScene } from "@/components/ui/lazy-unicorn-scene";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLAnchorElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for the background
      gsap.to(bgRef.current, {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Scale and fade out content as we scroll down
      gsap.to(contentRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 50,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom 20%",
          scrub: true,
        },
      });

      // Entrance animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
      tl.from(badgeRef.current, { y: 20, opacity: 0 }, 0.2)
        .from(titleRef.current, { y: 30, opacity: 0 }, 0.4)
        .from(paraRef.current, { y: 20, opacity: 0 }, 0.6)
        .from(buttonsRef.current, { y: 20, opacity: 0 }, 0.8);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden border-b">

      {/* Top Shades */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="absolute inset-0 isolate hidden overflow-hidden contain-strict lg:block"
      >
        <div className="absolute inset-0 -top-14 isolate -z-10 bg-[radial-gradient(40%_80%_at_49%_0%,rgba(255,233,71,0.12),transparent)] contain-strict" />
      </div>

      {/* Unicorn Studio Background */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
        <LazyUnicornScene 
          projectId="w8R1jmBz472q82R9YbLt" 
          sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.12/dist/unicornStudio.umd.js"
          width="100%" 
          height="100%" 
        />
      </div>

      {/* X Bold Faded Borders */}
      <div
        aria-hidden="true"
        className="absolute inset-0 mx-auto hidden min-h-screen w-full max-w-6xl lg:block"
      >
        <div className="mask-y-from-80% mask-y-to-100% absolute inset-y-0 left-0 z-10 h-full w-px bg-foreground/15" />
        <div className="mask-y-from-80% mask-y-to-100% absolute inset-y-0 right-0 z-10 h-full w-px bg-foreground/15" />
      </div>

      {/* main content */}
      <div ref={contentRef} className="relative flex flex-col items-center justify-center gap-5 pt-52 pb-48">
        {/* X Content Faded Borders */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-1 size-full overflow-hidden"
        >
          <div className="absolute inset-y-0 left-4 w-px bg-linear-to-b from-transparent via-border to-border md:left-8" />
          <div className="absolute inset-y-0 right-4 w-px bg-linear-to-b from-transparent via-border to-border md:right-8" />
          <div className="absolute inset-y-0 left-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:left-12" />
          <div className="absolute inset-y-0 right-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:right-12" />
        </div>

        <a
          ref={badgeRef}
          className={cn(
            "group mx-auto flex w-fit items-center gap-3 rounded-full border bg-card px-3 py-1 shadow transition-all duration-500 ease-out"
          )}
          href="#services"
        >
          <RocketIcon className="size-3 text-muted-foreground" />
          <span className="text-xs">Neu: KI-Automatisierungen für Ihr Marketing</span>
          <span className="block h-5 border-l" />

          <ArrowRightIcon className="size-3 duration-150 ease-out group-hover:translate-x-1" />
        </a>

        <h1
          ref={titleRef}
          className={cn(
            "text-balance text-center text-5xl tracking-tight md:text-6xl lg:text-7xl font-bold leading-[1.1]",
            "text-shadow-[0_0px_60px_rgba(255,233,71,0.25)]"
          )}
        >
          Keine gewöhnliche Agentur. <br /> (n)ordinary studios.
        </h1>

        <p ref={paraRef} className="mx-auto max-w-md text-center text-base text-foreground/80 tracking-wider sm:text-lg md:text-xl">
          Wir machen Marken nicht nur sichtbar, <br /> sondern unverwechselbar.
        </p>

        <div ref={buttonsRef} className="flex flex-row flex-wrap items-center justify-center gap-3 pt-2">
          <Button className="rounded-full" size="lg" variant="secondary">
            <PhoneCallIcon data-icon="inline-start" className="size-4 mr-2" />{" "}
            Erstgespräch buchen
          </Button>
          <Button className="rounded-full" variant="solid" size="lg">
            Leistungen entdecken{" "}
            <ArrowRightIcon 
            className="size-4 ms-2" data-icon="inline-end" />
          </Button>
        </div>

        {/* Integrated Logos */}
        <div className="mt-20 w-full max-w-4xl mx-auto px-6">
          <h2 className="text-center font-medium text-lg text-muted-foreground tracking-tight md:text-xl mb-6">
            Vertrauen von <span className="text-foreground">Experten</span>
          </h2>
          <LogoCloud logos={logos} />
        </div>
      </div>
    </section>

  );
}

export function LogosSection() {
  return (
    <section className="relative space-y-4 border-t pt-6 pb-10">
      <h2 className="text-center font-medium text-lg text-muted-foreground tracking-tight md:text-xl">
        Trusted by <span className="text-foreground">experts</span>
      </h2>
      <div className="relative z-10 mx-auto max-w-4xl">
        <LogoCloud logos={logos} />
      </div>
    </section>
  );
}

const logos = [
  {
    src: "https://storage.efferd.com/logo/nvidia-wordmark.svg",
    alt: "Nvidia Logo",
  },
  {
    src: "https://storage.efferd.com/logo/supabase-wordmark.svg",
    alt: "Supabase Logo",
  },
  {
    src: "https://storage.efferd.com/logo/openai-wordmark.svg",
    alt: "OpenAI Logo",
  },
  {
    src: "https://storage.efferd.com/logo/turso-wordmark.svg",
    alt: "Turso Logo",
  },
  {
    src: "https://storage.efferd.com/logo/vercel-wordmark.svg",
    alt: "Vercel Logo",
  },
  {
    src: "https://storage.efferd.com/logo/github-wordmark.svg",
    alt: "GitHub Logo",
  },
  {
    src: "https://storage.efferd.com/logo/claude-wordmark.svg",
    alt: "Claude AI Logo",
  },
  {
    src: "https://storage.efferd.com/logo/clerk-wordmark.svg",
    alt: "Clerk Logo",
  },
];
