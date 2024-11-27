import { APIProvider, Map as MapComponent } from "@vis.gl/react-google-maps";

import { Directions } from "./Directions";

type MapProps = {
  origin: {
    lat: number;
    lng: number;
  };
  originString: string;
  destinationString: string;
};

export const Map = ({ origin, originString, destinationString }: MapProps) => {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
      <MapComponent
        defaultCenter={origin}
        defaultZoom={9}
        gestureHandling={"greedy"}
        fullscreenControl={false}
      >
        <Directions origin={originString} destination={destinationString} />
      </MapComponent>
    </APIProvider>
  );
};
