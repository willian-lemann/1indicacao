import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";

const createJobSchema = z.object({
  positions: z.string().transform((value) => +value),
  salary: z.string(),
  position: z.string(),
});

const updateJobSchema = createJobSchema.extend({
  id: z.string(),
});

export type CreateJobSchemaData = z.infer<typeof createJobSchema>;
export type UpdateJobSchemaData = z.infer<typeof updateJobSchema>;

export const jobsRouter = createTRPCRouter({
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

  byId: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const job = await ctx.prisma.job.findFirst({
        where: {
          id: input.id,
        },
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      });

      return job;
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const jobs = await ctx.prisma.job.findMany({
      include: {
        user: true,
      },
    });
    return jobs;
  }),

  create: privateProcedure
    .input(createJobSchema)
    .mutation(async ({ ctx, input }) => {
      const { positions, salary, position } = input;

      const createdJob = await ctx.prisma.job.create({
        data: {
          position,
          positions,
          salary,
          user: { connect: { userId: ctx.currentUser } },
        },
      });

      return createdJob;
    }),

  update: privateProcedure
    .input(updateJobSchema)
    .mutation(async ({ ctx, input: { id, ...data } }) => {
      const updatedJob = await ctx.prisma.job.update({
        where: { id },
        data: {
          ...data,
        },
      });

      return updatedJob;
    }),

  toggleStatus: privateProcedure
    .input(z.object({ isActive: z.boolean(), id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { isActive, id } = input;

      await ctx.prisma.job.update({
        where: {
          id,
        },
        data: {
          isActive,
        },
      });
    }),
});
