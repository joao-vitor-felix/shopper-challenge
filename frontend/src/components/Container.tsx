import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const Container = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "flex h-screen flex-col items-center justify-center bg-bg-color-white-50 bg-background-shape",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
