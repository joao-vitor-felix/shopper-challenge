import { Request } from "express";

import {
  CustomerNotFoundError,
  internalServerError,
  InvalidDataError
} from "@/errors";
import { estimateRidesPayloadSchema } from "@/schemas/ride";
import { IEstimateRideUseCase } from "@/use-cases/estimate-ride";

export class EstimateRideController {
  constructor(private estimateRideUseCase: IEstimateRideUseCase) {}

  async estimate(req: Request) {
    try {
      const body = req.body;
      const parse = estimateRidesPayloadSchema.safeParse(body);

      if (!parse.success) {
        throw new InvalidDataError(parse.error.errors[0].message);
      }

      const rideOptions = await this.estimateRideUseCase.estimate({
        customer_id: parse.data.customer_id,
        origin: parse.data.origin,
        destination: parse.data.destination
      });

      return {
        status: 200,
        body: rideOptions
      };
    } catch (error) {
      console.log(error);
      if (error instanceof InvalidDataError) {
        return {
          status: 400,
          body: {
            error_code: error.code,
            error_description: error.message
          }
        };
      }

      if (error instanceof CustomerNotFoundError) {
        return {
          status: 404,
          body: {
            error_code: error.code,
            error_description: error.message
          }
        };
      }

      return internalServerError();
    }
  }
}
