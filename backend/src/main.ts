import express from "express";

import { rideRouter } from "./routes/ride";

const app = express();
app.use(express.json());
app.use("/ride", rideRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
