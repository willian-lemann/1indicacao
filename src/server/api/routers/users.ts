import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";

export const usersRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx }) => {}),
  getAll: publicProcedure.query(({ ctx }) => {
    // return ctx.prisma.example.findMany();
  }),
});
