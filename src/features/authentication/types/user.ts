import { Job } from "@/features/employers/types/job";

export type User = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  userId: string;
  role: string;
  description?: string | null;
  position?: string | null;
  instagram?: string | null;
  phone?: string | null;
  avatar?: string | null;
  locationId?: string | null;
};
