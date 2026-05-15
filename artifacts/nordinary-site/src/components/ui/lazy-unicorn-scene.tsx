import * as React from "react";
import UnicornScene from "unicornstudio-react";

type LazyUnicornSceneProps = React.ComponentProps<typeof UnicornScene> & {
  /** Root margin for IntersectionObserver (e.g. preload before visible). */
  rootMargin?: string;
};

/**
 * Mounts WebGL only while the block is on-screen (or near it) to avoid
 * running two Unicorn canvases for the full session.
 */
export function LazyUnicornScene({
  rootMargin = "120px 0px 120px 0px",
  width = "100%",
  height = "100%",
  ...rest
}: LazyUnicornSceneProps) {
  const hostRef = React.useRef<HTMLDivElement>(null);
  const [mount, setMount] = React.useState(false);

  React.useEffect(() => {
    const el = hostRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setMount(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMount(true);
      },
      { root: null, rootMargin, threshold: 0.01 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={hostRef} className="absolute inset-0 size-full">
      {mount ? <UnicornScene width={width} height={height} {...rest} /> : null}
    </div>
  );
}
