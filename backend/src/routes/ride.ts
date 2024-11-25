import { Router } from "express";

import { ConfirmRideController } from "@/controllers/confirm-ride";
import { EstimateRideController } from "@/controllers/estimate-ride";
import { GetRidesController } from "@/controllers/get-rides";
import {
  ConfirmRidePostgresRepository,
  FindCustomerByIdPostgresRepository,
  FindDriverByIdPostgresRepository,
  GetRidesPostgresRepository
} from "@/repositories/postgres";
import { EstimateRidePostgresRepository } from "@/repositories/postgres/ride/estimate-ride";
import { ConfirmRideUseCase } from "@/use-cases/confirm-ride";
import { EstimateRideUseCase } from "@/use-cases/estimate-ride";
import { GetRidesUseCase } from "@/use-cases/get-rides";

export const rideRouter = Router();

rideRouter.post("/estimate", async (req, res) => {
  const estimateRideRepository = new EstimateRidePostgresRepository();
  const findCustomerByIdRepository = new FindCustomerByIdPostgresRepository();
  const estimateRideUseCase = new EstimateRideUseCase(
    estimateRideRepository,
    findCustomerByIdRepository
  );
  const estimateRideController = new EstimateRideController(
    estimateRideUseCase
  );
  const { status, body } = await estimateRideController.estimate(req);
  res.status(status).send(body);
});

rideRouter.patch("/confirm", async (req, res) => {
  const confirmRideRepository = new ConfirmRidePostgresRepository();
  const findByCustomerIdRepository = new FindCustomerByIdPostgresRepository();
  const findByDriverIdRepository = new FindDriverByIdPostgresRepository();
  const confirmRideUseCase = new ConfirmRideUseCase(
    confirmRideRepository,
    findByCustomerIdRepository,
    findByDriverIdRepository
  );
  const confirmRideController = new ConfirmRideController(confirmRideUseCase);
  const { status, body } = await confirmRideController.confirm(req);
  res.status(status).json(body);
});

rideRouter.get("/:customerId", async (req, res) => {
  const getRidesRepository = new GetRidesPostgresRepository();
  const findByDriverIdRepository = new FindDriverByIdPostgresRepository();
  const getRidesUseCase = new GetRidesUseCase(
    getRidesRepository,
    findByDriverIdRepository
  );
  const getRidesController = new GetRidesController(getRidesUseCase);
  const { status, body } = await getRidesController.getRides(req);
  res.status(status).json(body);
});
