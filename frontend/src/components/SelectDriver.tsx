import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Driver = {
  id: number;
  name: string;
};

type SelectDriverProps = {
  value?: Driver;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (...event: any[]) => void;
  placeholder: string;
  drivers: Driver[];
};

export const SelectDriver = ({
  onChange,
  placeholder,
  drivers,
  value
}: SelectDriverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      className="relative h-10 min-w-[200px] max-w-[320px] outline-none"
      ref={divRef}
    >
      <div
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        className="flex size-full cursor-pointer items-center justify-between rounded-md bg-primary-color-violet-500 px-3 py-2 focus:border-2 focus:border-secondary-color-green-300 focus:shadow-sm"
      >
        <p className={`${value ? "text-white" : "text-gray-400"} text-sm`}>
          {value ? value.name : placeholder}
        </p>
        <ChevronDown
          className={`text-sm text-secondary-color-green-500 duration-200 ease-in ${isOpen ? "rotate-180" : "rotate-0"}`}
          size={16}
        />
      </div>
      {isOpen && (
        <div className="scrollbar absolute left-0 top-[105%] max-h-[200px] w-full overflow-y-auto rounded-md  bg-primary-color-violet-500">
          {drivers.map(driver => (
            <div
              className={`flex cursor-pointer rounded-sm px-3 py-2 hover:bg-secondary-color-green-200 ${driver.id === value?.id ? "bg-secondary-color-green-500" : "bg-primary-color-violet-500"} items-center justify-between`}
              onClick={() => {
                onChange(driver);
                setIsOpen(false);
              }}
              key={driver.id}
            >
              <p className="text-sm text-white">{driver.name}</p>
              {driver.id === value?.id && (
                <Check size={16} className="text-primary-color-violet-500" />
              )}
            </div>
          ))}
          {!drivers.length && (
            <p className="py-2 text-center text-sm text-white">
              Nenhum motorista encontrado.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
