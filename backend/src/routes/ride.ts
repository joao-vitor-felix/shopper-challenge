import { Router } from "express";

import { ConfirmRideController } from "@/controllers/confirm-ride";
import { GetRidesController } from "@/controllers/get-rides";
import {
  ConfirmRidePostgresRepository,
  FindCustomerByIdPostgresRepository,
  FindDriverByIdPostgresRepository,
  GetRidesPostgresRepository
} from "@/repositories/postgres";
import { ConfirmRideUseCase } from "@/use-cases/confirm-ride";
import { GetRidesUseCase } from "@/use-cases/get-rides";

export const rideRouter = Router();

// rideRouter.post("/estimate", (req, res) => {});

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
