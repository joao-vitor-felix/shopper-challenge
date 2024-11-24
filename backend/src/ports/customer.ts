import { Customer } from "@/types/customer";

export interface FindCustomerByIdRepositoryPort {
  findCustomerById(id: string): Promise<Customer | null>;
}
