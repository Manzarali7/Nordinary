"use client";

import { CinematicFooter } from "@/components/ui/motion-footer";
import { Header } from "@/components/ui/header-1";

export default function FooterDemo() {
  return (
    <div className="relative w-full bg-[#080808] min-h-screen font-sans selection:bg-white/20 overflow-x-hidden">
      <Header />
      {/* 
        MAIN CONTENT AREA 
        We use a high z-index and minimum height to allow the user 
        to scroll down and reveal the footer securely underneath.
      */}
      <main className="relative z-10 w-full min-h-[120vh] bg-[#080808] flex flex-col items-center justify-center text-white border-b border-white/10 shadow-2xl rounded-b-[48px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(255,233,71,0.03)_0%,transparent_60%)] pointer-events-none" />
        
        <h1 className="text-4xl md:text-5xl font-light tracking-[0.2em] text-zinc-500 mb-8 uppercase text-center px-4">
          Scroll down to reveal
        </h1>
        
        <div className="w-[1px] h-32 bg-gradient-to-b from-[#FFE947]/50 to-transparent" />
      </main>

      {/* The Cinematic Footer is injected here */}
      <CinematicFooter />
      
    </div>
  );
}
