import { ComponentProps } from "react";

const Container = ({ children, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className="flex h-screen flex-col items-center justify-center bg-bg-color-white-50 bg-background-shape"
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
