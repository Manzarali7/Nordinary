import * as React from "react";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { cn } from "@/lib/utils";

export type LogoItem = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: LogoItem[];
  /** Seconds per loop (maps to `InfiniteSlider` `duration`). */
  speed?: number;
  /** Seconds per loop while hovering (maps to `durationOnHover`). */
  speedOnHover?: number;
  reverse?: boolean;
  gap?: number;
};

export function LogoCloud({
  className,
  logos,
  speed = 38,
  speedOnHover = 52,
  reverse = true,
  gap = 42,
  ...props
}: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "relative isolate flex w-full items-stretch justify-center overflow-hidden border-y border-border/80 bg-background/40 py-5 md:py-6",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <ProgressiveBlur blurIntensity={6} className="hidden md:block" direction="left" />
      <ProgressiveBlur blurIntensity={6} className="hidden md:block" direction="right" />

      <InfiniteSlider duration={speed} durationOnHover={speedOnHover} gap={gap} reverse={reverse}>
        {logos.map((logo) => (
          <img
            alt={logo.alt}
            className="pointer-events-none h-5 max-w-[140px] shrink-0 select-none object-contain object-center opacity-75 md:h-6"
            height={logo.height ?? undefined}
            key={`${logo.src}-${logo.alt}`}
            loading="lazy"
            src={logo.src}
            width={logo.width ?? undefined}
          />
        ))}
      </InfiniteSlider>
    </div>
  );
}
