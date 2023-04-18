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

  getAllByMe: publicProcedure.query(async ({ ctx }) => {
    const jobs = await ctx.prisma.job.findMany({
      where: {
        userId: ctx.currentUser,
      },

      include: {
        user: true,
      },
    });

    return jobs;
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const jobs = await ctx.prisma.job.findMany({
      include: {
        user: true,
      },
    });
    return jobs;
  }),
});
