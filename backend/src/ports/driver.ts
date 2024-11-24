import { Driver } from "@/types/driver";

export interface FindDriverByIdRepositoryPort {
  findDriverById(id: number): Promise<Driver | null>;
}
