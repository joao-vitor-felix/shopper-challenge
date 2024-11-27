export class InvalidDataError extends Error {
  constructor(
    message = "Invalid data",
    readonly code = "INVALID_DATA"
  ) {
    super(message);
    this.name = "InvalidDataError";
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

export class NoRidesFoundError extends Error {
  constructor(
    message = "No rides found",
    readonly code = "NO_RIDES_FOUND"
  ) {
    super(message);
    this.name = "NoRidesFoundError";
  }
}

export function internalServerError() {
  return {
    status: 500,
    body: {
      error_code: "SERVER_ERROR",
      message: "Internal server error"
    }
  };
}
