import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const createUserSchema = z.object({
  name: z.string(),
  userId: z.string(),
});

export const jobsRouter = createTRPCRouter({
  create: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ input, ctx }) => {}),
  getAll: publicProcedure.query(({ ctx }) => {}),
});
