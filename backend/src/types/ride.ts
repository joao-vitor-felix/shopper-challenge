export type Ride = {
  id: string;
  customer_id: string;
  driver_id: number;
  created_at: string;
  origin: string;
  destination: string;
  estimated_duration_seconds: number;
  amount: number;
  distance_meters: number;
};

export type Rides = {
  customer_id: string;
  rides: {
    id: string;
    date: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: {
      id: number;
      name: string;
    };
    value: number;
  }[];
};

export type RideOptions = {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  distance: number;
  duration: string;
  options: {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: {
      rating: number;
      comment: string;
    };
    value: number;
  }[];
  routeResponse: unknown;
};
