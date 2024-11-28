import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Image } from "@/components/Image";
import { Input } from "@/components/Input";
import { InputGroup } from "@/components/InputGroup";
import { SelectDriver } from "@/components/SelectDriver";
import { useGetRideHistory } from "@/hooks/useGetRideHistory";

import { DriverHistoryCard } from "./components/DriverHistoryCard";
import {
  RideHistoryPayload,
  rideHistoryPayloadSchema
} from "./schemas/rideHistoryPayload";

export const RideHistoryPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch,
    reset
  } = useForm<RideHistoryPayload>({
    defaultValues: {
      customerId: "41b37ad0-9225-4b8e-8ed4-dba666c67cdc",
      driver: undefined
    },
    resolver: zodResolver(rideHistoryPayloadSchema)
  });

  const customerId = watch("customerId");
  const driver = watch("driver");
  const { data, isLoading, error, refetch } = useGetRideHistory({
    customerId,
    driver
  });

  if (error) {
    toast.error("Erro ao buscar histórico de corridas, tente novamente");
  }

  const onSubmit = (data: RideHistoryPayload) => {
    reset({
      customerId: data.customerId,
      driver: data.driver
    });
    refetch();
  };

  return (
    <Container className="p-5 lg:px-0 lg:py-4">
      <Link to="/" className="mb-14">
        <Image
          src="/logo-shopper.png"
          className="block lg:hidden"
          aria-label="Logo da Shopper"
          title="Logo da Shopper"
        />
        <Image
          src="/logo-shopper-desktop.png"
          className="hidden lg:block"
          aria-label="Logo da Shopper"
          title="Logo da Shopper"
        />
      </Link>
      <form
        className="mb-8 flex w-52 flex-col items-center justify-center gap-7 lg:w-full lg:flex-row"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-7 lg:flex-row">
          <InputGroup>
            <Input
              icon="id"
              id="id"
              placeholder="Insira o id do usuário"
              {...register("customerId")}
            />
            {errors.customerId?.message && (
              <ErrorMessage>{errors.customerId.message}</ErrorMessage>
            )}
          </InputGroup>
          <Controller
            control={control}
            name="driver"
            render={({ field }) => (
              <SelectDriver
                onChange={field.onChange}
                value={field.value}
                placeholder="Selecione o motorista"
                //TODO: Replace with real data
                drivers={[
                  {
                    id: 1,
                    name: "Homer Simpson"
                  },
                  {
                    id: 2,
                    name: "Dominic Toretto"
                  },
                  {
                    id: 3,
                    name: "James Bond"
                  }
                ]}
              />
            )}
          />
        </div>
        <Button className="self-center lg:w-28 lg:self-start">Aplicar</Button>
      </form>

      {isLoading && (
        <Loader2 className="size-10 animate-spin text-secondary-color-green-500" />
      )}

      <div className="scrollbar flex w-full flex-col items-center gap-4 overflow-y-auto pr-2 md:w-[546px]">
        {!isLoading &&
          data &&
          data.rides.map(ride => (
            <DriverHistoryCard
              key={ride.id}
              id={ride.id}
              driver={{ id: ride.driver.id, name: ride.driver.name }}
              date={ride.date}
              destination={ride.destination}
              origin={ride.origin}
              distance={ride.distance}
              duration={parseInt(ride.duration)}
              value={ride.value}
            />
          ))}
      </div>
    </Container>
  );
};
