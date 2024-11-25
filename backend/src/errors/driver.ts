export class DriverNotFoundError extends Error {
  constructor(
    message = "Driver not found",
    readonly code = "DRIVER_NOT_FOUND"
  ) {
    super(message);
    this.name = "DriverNotFoundError";
  }
}

export class InvalidDriverError extends Error {
  constructor(
    message = "Invalid driver",
    readonly code = "INVALID_DRIVER"
  ) {
    super(message);
    this.name = "InvalidDriverError";
  }
}
