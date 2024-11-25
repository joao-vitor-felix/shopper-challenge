export type DirectionsResponse = {
  routes: {
    legs: {
      duration: {
        text: string;
        value: number;
      };
      distance: {
        text: string;
        value: number;
      };
      start_location: {
        lat: number;
        lng: number;
      };
      start_address: string;
      end_location: {
        lat: number;
        lng: number;
      };
      end_address: string;
    }[];
  }[];
};
