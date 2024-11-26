import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { Button } from "@/components/Button";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Image } from "@/components/Image";
import { Input } from "@/components/Input";
import { InputGroup } from "@/components/InputGroup";
import {
  EstimateRidesPayload,
  estimateRidesPayloadSchema
} from "@/schemas/estimate-ride";

export const EstimateRidePage = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<EstimateRidesPayload>({
    defaultValues: {
      customerId: "41b37ad0-9225-4b8e-8ed4-dba666c67cdc",
      origin: "",
      destination: ""
    },
    resolver: zodResolver(estimateRidesPayloadSchema)
  });

  const onSubmit = (data: EstimateRidesPayload) => {
    navigate(
      `/confirm?origin=${data.origin}&destination=${data.destination}&customerId=${data.customerId}`
    );
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-bg-color-white-50 bg-background-shape">
      <Image
        src="/logo-shopper.png"
        className="mb-14 block lg:hidden"
        aria-label="Logo da Shopper"
      />
      <Image
        src="/logo-shopper-desktop.png"
        className="mb-14 hidden lg:block"
        aria-label="Logo da Shopper"
      />
      <form className="flex w-72 flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-7">
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
          <InputGroup>
            <Input
              icon="location"
              id="origin"
              placeholder="Insira o local de origem"
              {...register("origin")}
            />
            {errors.origin?.message && (
              <ErrorMessage>{errors.origin.message}</ErrorMessage>
            )}
          </InputGroup>
          <InputGroup>
            <Input
              icon="location"
              id="destination"
              placeholder="Insira o local de destino"
              {...register("destination")}
            />
            {errors.destination?.message && (
              <ErrorMessage>{errors.destination.message}</ErrorMessage>
            )}
          </InputGroup>
        </div>
        <Button className="mt-8 self-center text-xs lg:text-base lg:duration-300 lg:ease-in lg:hover:border lg:hover:border-secondary-color-green-500 lg:hover:bg-white-50 lg:hover:text-secondary-color-green-500">
          Buscar viagem
        </Button>
      </form>
      <Image
        src="/illustration-1.png"
        className="mt-8 block lg:hidden"
        aria-label="Ilustração de uma pessoa apontando em direção ao horizonte"
      />
      <Image
        src="/illustration-1-desktop.png"
        className="mt-8 hidden lg:block"
        aria-label="Ilustração de uma pessoa apontando em direção ao horizonte"
      />
      <Image
        src="/shape-footer.png"
        className="absolute -bottom-2 left-0 mt-8 block lg:hidden"
      />
      <Image
        src="/shape-footer-desktop.png"
        className="absolute -bottom-1 left-0 mt-8 hidden lg:block"
      />
    </div>
  );
};
