import { MapPin } from "lucide-react";
import { IdCard } from "lucide-react";
import { ComponentProps, forwardRef } from "react";

import { cn } from "@/lib/utils";

const ICONS = {
  location: <MapPin size={16} />,
  id: <IdCard size={18} />
};

type InputProps = {
  icon: keyof typeof ICONS;
} & ComponentProps<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, className, id, ...props }, ref) => {
    return (
      <div className="relative flex">
        <input
          className={cn(
            "h-8 rounded-[4px] rounded-r-none bg-primary-color-violet-500 py-[10px] pl-[10px] text-xs lg:text-base text-white-50 outline-none focus:ring-2 focus:ring-secondary-color-green-400 focus:ring-inset w-[85%] lg:h-10 pr-2",
            className
          )}
          {...props}
          id={id}
          ref={ref}
        />
        <div className="absolute right-0 h-full w-[15%] self-center rounded-r-[4px] bg-secondary-color-green-500 text-white">
          <label
            className="flex h-full items-center justify-center text-center"
            htmlFor={id}
          >
            {ICONS[icon]}
          </label>
        </div>
      </div>
    );
  }
);
