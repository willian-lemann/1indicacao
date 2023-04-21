export type Job = {
  id: string;
  position: string;
  positions: number;
  salary: string;
  user: { name: string | null } | null;
  isActive: boolean;
  createdAt: Date;
};
