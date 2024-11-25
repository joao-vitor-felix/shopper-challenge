import { Request } from "express";

import {
  internalServerError,
  InvalidDataError,
  InvalidDriverError,
  NoRidesFoundError
} from "@/errors";
import { getRidesPayloadSchema } from "@/schemas/ride";
import { IGetRidesUseCase } from "@/use-cases/get-rides";

export class GetRidesController {
  constructor(private getRidesUseCase: IGetRidesUseCase) {}

  async getRides(req: Request) {
    try {
      const params = {
        customer_id: req.params.customerId,
        driver_id: req.query.driver_id
          ? parseInt(req.query.driver_id as string)
          : undefined
      };
      const parse = getRidesPayloadSchema.safeParse(params);

      if (!parse.success) {
        throw new InvalidDataError(parse.error.errors[0].message);
      }

      const rides = await this.getRidesUseCase.getRides(
        parse.data.customer_id,
        parse.data.driver_id
      );

      return {
        status: 200,
        body: rides
      };
    } catch (error) {
      if (
        error instanceof InvalidDataError ||
        error instanceof InvalidDriverError
      ) {
        return {
          status: 400,
          body: {
            error_code: error.code,
            message: error.message
          }
        };
      }

      if (error instanceof NoRidesFoundError) {
        return {
          status: 404,
          body: {
            error_code: error.code,
            message: error.message
          }
        };
      }

      return internalServerError();
    }
  }
}
