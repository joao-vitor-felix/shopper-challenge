import { z } from "zod";

export const rideHistoryPayloadSchema = z.object({
  customerId: z
    .string({
      required_error: "customer_id must be provided",
      invalid_type_error: "customer_id must be a string"
    })
    .trim()
    .uuid({ message: "O id do usuário deve ser um UUID." }),
  driverId: z.string().trim().optional()
});

export type RideHistoryPayload = z.infer<typeof rideHistoryPayloadSchema>;
