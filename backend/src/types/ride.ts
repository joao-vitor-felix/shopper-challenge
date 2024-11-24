export type Ride = {
  id: string;
  customer_id: string;
  driver_id: string;
  created_at: string;
  origin: string;
  destination: string;
  estimated_duration_seconds: number;
  amount: number;
  distance_meters: number;
};
