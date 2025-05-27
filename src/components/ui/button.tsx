// components/ui/button.tsx

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx"; // Ensure clsx is installed
import { buttonVariants } from "./buttonvariants";
import type { VariantProps } from "class-variance-authority";

// ButtonProps Interface
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// Button Component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={clsx(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
