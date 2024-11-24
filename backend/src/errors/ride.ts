export class InvalidDataError extends Error {
  constructor(
    message: string,
    readonly code = "INVALID_DATA"
  ) {
    super(message);
    this.name = "InvalidDataError";
  }
}

export class DriverNotFoundError extends Error {
  constructor(
    message = "Driver not found",
    readonly code = "DRIVER_NOT_FOUND"
  ) {
    super(message);
    this.name = "DriverNotFoundError";
  }
}

export class InvalidDistanceError extends Error {
  constructor(
    message = "Invalid distance",
    readonly code = "INVALID_DISTANCE"
  ) {
    super(message);
    this.name = "InvalidDistanceError";
  }
}
