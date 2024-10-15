import { memo, ReactNode } from "react";
import { NavLink } from "react-router-dom";

import { cn } from "~lib/utils";

interface ButtonProps {
  children: ReactNode;
  to: string;
}

const ButtonLink = memo(({ children, to }: ButtonProps) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <button
          className={cn(
            "relative inline-flex items-center justify-center min-w-28 h-full bg-transparent whitespace-nowrap rounded-full text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            {
              "text-primary-foreground": isActive,
              "text-gray-500": !isActive,
            },
          )}
        >
          {children}
        </button>
      )}
    </NavLink>
  );
});

export default ButtonLink;
