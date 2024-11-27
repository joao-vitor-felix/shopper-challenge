import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Image } from "@/components/Image";
import { Input } from "@/components/Input";
import { InputGroup } from "@/components/InputGroup";
import {
  EstimateRidesPayload,
  estimateRidesPayloadSchema
} from "@/schemas/estimateRide";

export const EstimateRidePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error === "missing_params") {
      toast.error("É necessário informar origem, destino e id do usuário");
    }
  }, [error]);

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

  const onSubmit = (data: EstimateRidesPayload) =>
    navigate(
      `/confirm?origin=${data.origin}&destination=${data.destination}&customer_id=${data.customerId}`
    );

  return (
    <Container>
      <Link to="/">
        <Image
          src="/logo-shopper.png"
          className="mb-14 block lg:hidden"
          aria-label="Logo da Shopper"
        />
      </Link>
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
        <Button className="mt-8 self-center">Buscar viagem</Button>
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
    </Container>
  );
};
