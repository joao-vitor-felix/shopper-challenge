import { ConfirmRideController } from "@/controllers/confirm-ride";
import { FindCustomerByIdPostgresRepository } from "@/repositories/postgres/customer/find-customer-by-id";
import { FindDriverByIdPostgresRepository } from "@/repositories/postgres/driver/find-driver-by-id";
import { ConfirmRidePostgresRepository } from "@/repositories/postgres/ride/confirm-ride";
import { ConfirmRideUseCase } from "@/use-cases/confirm-ride";
import { Router } from "express";

export const rideRouter = Router();

rideRouter.post("/estimate", (req, res) => {});

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

rideRouter.get("/:customerId", (req, res) => {
  // const driverId = req.query.driver_id;
});
