export type GetRidesResponse = {
  customer_id: string;
  rides: {
    id: string;
    date: string;
    distance: number;
    duration: string;
    origin: string;
    destination: string;
    driver: {
      id: number;
      name: string;
    };
    value: number;
  }[];
};
