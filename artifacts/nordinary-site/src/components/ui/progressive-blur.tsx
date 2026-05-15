import * as React from "react";

import { cn } from "@/lib/utils";

export type ProgressiveBlurProps = Omit<React.ComponentProps<"div">, "children"> & {
  direction: "left" | "right";
  blurIntensity?: number;
};

export function ProgressiveBlur({
  direction,
  blurIntensity = 10,
  className,
  style,
  ...rest
}: ProgressiveBlurProps) {
  const isLeft = direction === "left";
  const mask = isLeft
    ? "linear-gradient(to right, black 0%, black 35%, transparent 100%)"
    : "linear-gradient(to left, black 0%, black 35%, transparent 100%)";

  return (
    <div
      className={cn("pointer-events-none absolute inset-y-0 z-20 w-16 sm:w-20 md:w-28", isLeft ? "left-0" : "right-0", className)}
      style={{
        ...style,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
      {...rest}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-background/55"
        style={{
          backdropFilter: `blur(${blurIntensity}px)`,
          WebkitBackdropFilter: `blur(${blurIntensity}px)`,
        }}
      />
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 opacity-70",
          isLeft
            ? "bg-linear-to-r from-background via-background/40 to-transparent"
            : "bg-linear-to-l from-background via-background/40 to-transparent",
        )}
      />
    </div>
  );
}
