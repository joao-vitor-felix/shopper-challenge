import { CustomerNotFoundError } from "@/errors/customer";
import {
  DriverNotFoundError,
  InvalidDataError,
  InvalidDistanceError
} from "@/errors/ride";
import { confirmPayloadSchema } from "@/schemas/ride";
import { IConfirmRideUseCase } from "@/use-cases/confirm-ride";
import { Request } from "express";

export class ConfirmRideController {
  constructor(private confirmRideUseCase: IConfirmRideUseCase) {}
  async confirm(req: Request) {
    try {
      const body = req.body;
      const parse = confirmPayloadSchema.safeParse(body);
      if (!parse.success) {
        throw new InvalidDataError(parse.error.errors[0].message);
      }
      await this.confirmRideUseCase.confirm(parse.data);
      return {
        status: 200,
        body: { success: true }
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

      if (
        error instanceof CustomerNotFoundError ||
        error instanceof DriverNotFoundError
      ) {
        return {
          status: 404,
          body: {
            error_code: error.code,
            error_description: error.message
          }
        };
      }

      if (error instanceof InvalidDistanceError) {
        return {
          status: 406,
          body: {
            error_code: error.code,
            error_description: error.message
          }
        };
      }

      return {
        status: 500,
        body: { message: "Internal server error" }
      };
    }
  }
}
