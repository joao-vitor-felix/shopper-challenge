import { z } from "zod";

export const sharedPayloadSchema = z.object({
  customer_id: z
    .string({
      invalid_type_error: "customer_id must be a string",
      required_error: "customer_id must be provided"
    })
    .trim()
    .uuid({ message: "customer_id must be a valid UUID" }),
  origin: z
    .string({
      invalid_type_error: "origin must be a string",
      required_error: "origin must be provided"
    })
    .trim()
    .min(1, {
      message: "origin must be provided."
    }),
  destination: z
    .string({
      invalid_type_error: "destination must be a string",
      required_error: "destination must be provided"
    })
    .trim()
    .min(1, {
      message: "destination must be provided"
    })
});

export const estimateRidesPayloadSchema = sharedPayloadSchema.refine(
  data => data.origin !== data.destination,
  {
    message: "origin and destination must be different"
  }
);

export const confirmRidesPayloadSchema = sharedPayloadSchema
  .extend({
    distance: z
      .number({
        invalid_type_error: "distance must be a number",
        required_error: "distance is required"
      })
      .int({ message: "distance must be an integer" })
      .positive({ message: "distance must be a positive integer" }),
    duration: z
      .string({
        invalid_type_error: "duration must be a string",
        required_error: "duration is required"
      })
      .trim()
      .min(1, {
        message: "duration is required"
      }),
    driver: z.object({
      id: z
        .number({
          invalid_type_error: "driver.id must be a number",
          required_error: "driver.id must be provided"
        })
        .int({ message: "driver.id must be an integer" })
        .positive({ message: "driver.id must be a positive integer" }),
      name: z
        .string({
          invalid_type_error: "driver.name must be a string",
          required_error: "driver.name must be provided"
        })
        .trim()
        .min(1, {
          message: "driver.name is required"
        })
    }),
    value: z
      .number({
        invalid_type_error: "value must be a number",
        required_error: "value must be provided"
      })
      .positive()
  })
  .refine(data => data.origin !== data.destination, {
    message: "origin and destination must be different"
  });

export const getRidesPayloadSchema = z.object({
  customer_id: z
    .string({
      required_error: "customer_id must be provided",
      invalid_type_error: "customer_id must be a string"
    })
    .trim()
    .uuid({ message: "customer_id must be a valid UUID" }),
  driver_id: z
    .number({
      invalid_type_error: "driver_id must be a number",
      required_error: "driver_id must be provided"
    })
    .int({ message: "driver_id must be an integer" })
    .positive({
      message: "driver_id must be a positive integer"
    })
    .optional()
});

export type EstimateRidesPayload = z.infer<typeof estimateRidesPayloadSchema>;
export type ConfirmRidesPayload = z.infer<typeof confirmRidesPayloadSchema>;
export type GetRidesPayload = z.infer<typeof getRidesPayloadSchema>;
