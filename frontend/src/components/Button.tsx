import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const Button = ({
  children,
  className,
  ...props
}: ComponentProps<"button">) => {
  return (
    <button
      className={cn(
        "bg-secondary-color-green-500 text-white p-[10px] lg:p-0 rounded-[4px] w-32 lg:w-36 lg:h-10 text-center",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
