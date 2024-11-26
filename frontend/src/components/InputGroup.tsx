import { ComponentProps } from "react";

export const InputGroup = ({ children, ...props }: ComponentProps<"div">) => {
  return (
    <div className="flex flex-col gap-1 lg:w-full" {...props}>
      {children}
    </div>
  );
};
