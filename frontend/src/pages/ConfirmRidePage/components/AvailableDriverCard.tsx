import { Loader2, Star } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import { Button } from "@/components/Button";
import { useConfirmRide } from "@/hooks/useConfirmRide";

type AvailableDriverCardProps = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  rating: number;
  value: number;
  customerId: string;
  destination: string;
  origin: string;
  distance: number;
  duration: number;
};

export const AvailableDriverCard = (props: AvailableDriverCardProps) => {
  const navigate = useNavigate();
  const { mutate, isPending } = useConfirmRide({
    onError() {
      toast.error("Erro ao confirmar corrida, tente novamente");
    },
    onSuccess() {
      toast.success("Corrida confirmada com sucesso!");
      navigate("/rides");
    }
  });

  const handleConfirmRide = () =>
    mutate({
      customerId: props.customerId,
      destination: props.destination,
      origin: props.origin,
      distance: props.distance,
      driver: {
        id: props.id,
        name: props.name
      },
      duration: props.duration,
      value: props.value
    });

  return (
    <div className="flex h-40 w-full overflow-hidden rounded-xl border border-secondary-color-green-100 px-4 py-3 text-sm">
      <div className="flex min-w-[45%] flex-col justify-center space-y-3 border-r border-secondary-color-green-100 pr-4 text-black-500">
        <span className="text-base">{props.name}</span>
        <span className="text-base">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(props.value)}
        </span>
        <div className="flex w-full flex-col text-sm">
          <span>Veículo</span>
          <span className="truncate text-xs text-black-300">
            {props.vehicle}
          </span>
        </div>
      </div>
      <div className="flex w-full flex-col justify-center gap-2 overflow-hidden pl-4">
        <div className="flex justify-between">
          <span className="text-sm">Avaliação</span>
          <div className="flex items-center  gap-1">
            <Star className="text-secondary-color-green-500" size={15} />
            {props.rating}
          </div>
        </div>
        <div className="flex flex-col">
          <span>Descrição</span>
          <span className="truncate text-xs text-black-300 ">
            {props.description}
          </span>
        </div>
        <Button
          className={`flex h-6 w-full items-center justify-center gap-2 self-end p-0 ${isPending ? "border border-secondary-color-green-500 bg-white-50 text-secondary-color-green-500" : ""}`}
          onClick={handleConfirmRide}
        >
          {isPending ? "Confirmando" : "Escolher"}
          {isPending && (
            <Loader2 className="size-4 animate-spin text-secondary-color-green-500" />
          )}
        </Button>
      </div>
    </div>
  );
};
