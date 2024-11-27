import { Clock } from "lucide-react";

import { formatDate } from "@/lib/formatDate";
import { formatDuration } from "@/lib/formatDuration";

type DriverHistoryCardProps = {
  id: string;
  date: string;
  distance: number;
  duration: number;
  value: number;
  origin: string;
  destination: string;
  driver: {
    id: number;
    name: string;
  };
};

export const DriverHistoryCard = (props: DriverHistoryCardProps) => {
  return (
    <div className="flex h-40 min-h-40 w-full overflow-hidden rounded-xl border border-secondary-color-green-100 px-4 py-3 text-sm">
      <div className="flex min-w-[45%] flex-col justify-center space-y-3 border-r border-secondary-color-green-100 pr-2 text-black-500">
        <span className="text-base">{props.driver.name}</span>
        <span className="text-xs text-black-300">{formatDate(props.date)}</span>
        <span className="text-base">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(props.value)}
        </span>
        <div className="flex w-full items-center gap-1 text-xs text-black-300">
          <Clock size={15} />
          <span>{formatDuration(props.duration)}</span>
        </div>
      </div>
      <div className="flex w-full flex-col justify-center gap-3 overflow-hidden pl-4">
        <div className="flex items-center gap-1 text-xs">
          <span>Distância:</span>
          <span className="truncate text-black-300">
            {(props.distance / 1000).toPrecision(3)} km
          </span>
        </div>
        <div className="flex items-center gap-1 truncate text-xs">
          <span>Origem:</span>
          <span className="truncate text-black-300">{props.origin}</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <span>Destino:</span>
          <span className="truncate text-black-300">{props.destination}</span>
        </div>
      </div>
    </div>
  );
};
