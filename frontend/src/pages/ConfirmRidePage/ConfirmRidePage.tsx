import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";

import { Container } from "@/components/Container";
import { useGetRideOptions } from "@/hooks/useGetRideOptions";

import { AvailableDriverCard } from "./components/AvailableDriverCard";
import { Map } from "./components/Map";

export const ConfirmRidePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const customerId = searchParams.get("customer_id");

  useEffect(() => {
    if (!origin || !destination || !customerId) {
      toast.error("É necessário informar origem, destino e id do usuário.");
      navigate("/");
    }
  }, [origin, destination, customerId, navigate]);

  const { data, isLoading, error } = useGetRideOptions({
    customerId: customerId!,
    origin: origin!,
    destination: destination!
  });

  if (error) {
    toast.error(
      "Erro ao buscar motoristas disponíveis, rota não encontrada para os parâmetros fornecidos."
    );
    navigate("/");
  }

  return (
    <Container className="gap-4 px-5 lg:p-4">
      {isLoading && (
        <Loader2 className="size-10 animate-spin text-secondary-color-green-500" />
      )}

      {!isLoading && data && (
        <>
          <div className="h-80 w-full lg:size-[546px]">
            <Map
              origin={{
                lat: data.origin.latitude,
                lng: data.origin.longitude
              }}
              originString={origin!}
              destinationString={destination!}
            />
          </div>
          <div className="flex w-full flex-col items-center gap-4 overflow-y-auto lg:w-[546px]">
            {data.options.map(driver => (
              <AvailableDriverCard
                key={driver.id}
                id={driver.id}
                name={driver.name}
                description={driver.description}
                vehicle={driver.vehicle}
                rating={driver.review.rating}
                value={driver.value}
                customerId={customerId!}
                destination={destination!}
                origin={origin!}
                distance={data.distance}
                duration={data.duration}
              />
            ))}
          </div>
        </>
      )}
    </Container>
  );
};
