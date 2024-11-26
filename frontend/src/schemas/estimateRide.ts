import { z } from "zod";

export const sharedPayloadSchema = z.object({
  customerId: z
    .string({
      required_error: "O id do cliente deve ser fornecido."
    })
    .trim()
    .uuid({ message: "O id deve ser um uuid." }),
  origin: z
    .string({
      invalid_type_error: "Origem inválida.",
      required_error: "O ponto de origem deve ser fornecido."
    })
    .trim()
    .min(1, {
      message: "O ponto de origem deve ser fornecido."
    }),
  destination: z
    .string({
      invalid_type_error: "Destino inválido.",
      required_error: "O ponto de destino deve ser fornecido."
    })
    .trim()
    .min(1, {
      message: "O ponto de destino deve ser fornecido."
    })
});

export const estimateRidesPayloadSchema = sharedPayloadSchema.refine(
  data => data.origin !== data.destination,
  {
    message: "O ponto de origem e o ponto de destino devem ser diferentes.",
    path: ["destination"]
  }
);

export type EstimateRidesPayload = z.infer<typeof estimateRidesPayloadSchema>;
