export class CustomerNotFoundError extends Error {
  constructor(
    message = "Customer not found",
    readonly code = "CUSTOMER_NOT_FOUND"
  ) {
    super(message);
    this.name = "CustomerNotFoundError";
  }
}
