import { ComponentProps } from "react";

export const Image = ({ src, alt, ...props }: ComponentProps<"img">) => {
  return <img src={src} alt={alt} {...props} />;
};
