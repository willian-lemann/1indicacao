import { User } from "@/features/authentication/types/user";

export type CandidatesStore = {
  isWarningFullProfile: boolean;
  candidates: User[];
  setCandidates(candidates: User[]): void;
  loadWarningFullProfileStorage(): void;
  closeWarningFullProfile(): void;
};
