import React from 'react'
import { cn } from '@/lib/utils'
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
    "relative group border text-foreground mx-auto text-center rounded-full transition-all duration-300 inline-flex items-center justify-center whitespace-nowrap overflow-hidden disabled:opacity-50 disabled:pointer-events-none",
    {
        variants: {
            variant: {
                default: "bg-[#FFE947]/5 hover:bg-[#FFE947]/0 border-[#FFE947]/20",
                solid: "bg-[#FFE947] hover:bg-amber-600 text-black border-transparent hover:border-foreground/50 transition-all duration-200 font-bold",
                ghost: "border-transparent bg-transparent hover:border-zinc-600 hover:bg-white/10",
                outline: "border border-white/20 bg-transparent hover:bg-white/5",
                secondary: "bg-white/10 text-white hover:bg-white/20 border-white/10",
            },
            size: {
                default: "px-7 py-1.5 ",
                sm: "px-4 py-0.5 ",
                lg: "px-10 py-2.5 ",
                icon: "h-10 w-10 p-0 flex items-center justify-center",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { neon?: boolean }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, neon = true, size, variant, children, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size }), className)}
                ref={ref}
                {...props}
            >
                {/* Top Neon line */}
                <span className={cn("absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 top-0 bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-amber-400 via-[#FFE947] to-transparent pointer-events-none", neon && "block hidden group-hover:block")} />
                
                {children}
                
                {/* Bottom Neon line */}
                <span className={cn("absolute group-hover:opacity-60 transition-all duration-500 ease-in-out inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-amber-400 via-[#FFE947] to-transparent pointer-events-none", neon && "block hidden group-hover:block")} />
            </button>
        );
    }
)

Button.displayName = 'Button';

export { Button, buttonVariants };
