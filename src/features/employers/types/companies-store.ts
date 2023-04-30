import { User } from "@/features/authentication/types/user";

export type CompaniesStore = {
  companies: User[];
  setCompanies(companies: User[]): void;
};
