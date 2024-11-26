import { ComponentProps } from "react";

export const ErrorMessage = ({ children, ...props }: ComponentProps<"p">) => {
  return (
    <p className="w-full text-xs text-red-500 lg:text-base" {...props}>
      {children}
    </p>
  );
};
