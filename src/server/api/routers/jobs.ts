import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";

const createUserSchema = z.object({
  name: z.string(),
  userId: z.string(),
});

export const jobsRouter = createTRPCRouter({
  create: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ input, ctx }) => {}),

  getAllByMe: privateProcedure.query(async ({ ctx }) => {
    const jobs = await ctx.prisma.job.findMany({
      where: {
        userId: ctx.currentUser,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
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
