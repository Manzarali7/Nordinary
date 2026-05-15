import * as React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useScroll } from "@/components/ui/use-scroll";
import { brandLogoSrc } from "@/lib/brand-logo";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Leistungen", href: "#" },
  { label: "Projekte", href: "#" },
  { label: "Über uns", href: "#" },
  { label: "Blog", href: "#" },
];

export type HeaderProps = {
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  className?: string;
};

function BrandWordmark() {
  return (
    <img
      src={brandLogoSrc}
      alt="Nordinary studios"
      className="h-10 w-auto object-contain md:h-12"
    />
  );
}

export function Header({ scrollContainerRef, className }: HeaderProps) {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10, scrollContainerRef);
  const shellRef = React.useRef<HTMLDivElement>(null);
  const [sheetTop, setSheetTop] = React.useState(80);

  React.useLayoutEffect(() => {
    const el = shellRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => {
      const r = shellRef.current?.getBoundingClientRect();
      if (r) setSheetTop(Math.ceil(r.bottom + 4));
    });
    ro.observe(el);
    const r = el.getBoundingClientRect();
    setSheetTop(Math.ceil(r.bottom + 4));
    return () => ro.disconnect();
  }, [open]);

  React.useEffect(() => {
    const el = scrollContainerRef?.current;
    if (!open) return;

    const prevOverflow = el ? el.style.overflow : "";
    const prevBodyOverflow = document.body.style.overflow;

    if (el) {
      el.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "hidden";
    }

    return () => {
      if (el) {
        el.style.overflow = prevOverflow;
      } else {
        document.body.style.overflow = prevBodyOverflow;
      }
    };
  }, [open, scrollContainerRef]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex w-full justify-center px-3 pt-3 md:px-4 md:pt-4",
        className,
      )}
    >
      <div
        ref={shellRef}
        className={cn(
          "w-full max-w-5xl border transition-[padding,background-color,box-shadow,border-color,border-radius,backdrop-filter] duration-300 ease-out",
          scrolled
            ? "border-white/10 bg-[#080808]/90 py-1.5 shadow-lg supports-[backdrop-filter]:bg-[#080808]/65 supports-[backdrop-filter]:backdrop-blur-xl md:rounded-2xl"
            : "border-transparent bg-transparent py-2",
        )}
      >
        <nav
          className={cn(
            "mx-auto flex w-full items-center justify-between gap-2 px-2 transition-[min-height,padding] duration-300 ease-out md:gap-3 md:px-3",
            scrolled ? "min-h-12" : "min-h-14",
          )}
        >
          <a
            href="#"
            className="rounded-md p-2 transition-colors hover:bg-white/5"
            onClick={() => setOpen(false)}
          >
            <BrandWordmark />
          </a>

          <div className="hidden items-center gap-1 md:flex md:gap-2">
            {LINKS.map((link) => (
              <a
                key={link.label}
                className={buttonVariants({
                  variant: "ghost",
                  className:
                    "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                })}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
            <Button
              variant="outline"
              className="rounded-full border-[#FFE947]/40 bg-transparent text-[#FFE947] hover:border-[#FFE947] hover:bg-[#FFE947]/10 hover:text-[#FFE947]"
            >
              Erstgespräch buchen
            </Button>
          </div>

          <Button
            size="icon"
            variant="outline"
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="shrink-0 rounded-full border-white/15 bg-transparent text-white hover:bg-white/10 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Menü umschalten"
          >
            <MenuToggleIcon open={open} className="size-5" duration={300} />
          </Button>
        </nav>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className={cn(
            "fixed inset-x-0 bottom-0 z-40 flex flex-col overflow-hidden border-t border-white/10 bg-[#080808]/95 supports-[backdrop-filter]:bg-[#080808]/70 supports-[backdrop-filter]:backdrop-blur-xl md:hidden",
          )}
          style={{ top: sheetTop }}
        >
          <div
            data-slot="open"
            className={cn(
              "ease-out animate-in fade-in-0 zoom-in-95 flex size-full flex-col justify-between gap-4 p-4 duration-200",
            )}
          >
            <div className="grid gap-y-1">
              {LINKS.map((link) => (
                <a
                  key={link.label}
                  className={buttonVariants({
                    variant: "ghost",
                    className:
                      "justify-start text-muted-foreground hover:bg-white/5 hover:text-foreground",
                  })}
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-2 pb-6">
              <Button
                variant="outline"
                className="w-full rounded-full border-[#FFE947]/40 bg-transparent text-[#FFE947]"
                onClick={() => setOpen(false)}
              >
                Erstgespräch buchen
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
