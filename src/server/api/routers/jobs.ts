import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { rateLimit } from "@/utils/rate-limit";
import { TRPCError } from "@trpc/server";

const createJobSchema = z.object({
  positions: z.string().transform((value) => +value),
  salary: z.string(),
  position: z.string(),
  description: z.string().optional(),
});

const updateJobSchema = createJobSchema.extend({
  id: z.string(),
});

export type CreateJobSchemaData = z.infer<typeof createJobSchema>;
export type UpdateJobSchemaData = z.infer<typeof updateJobSchema>;

export const jobsRouter = createTRPCRouter({
  byId: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const job = await ctx.prisma.job.findFirst({
        where: {
          id: input.id,
        },
        include: {
          user: true,
        },
      });

      return job;
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { userId: ctx.currentUser as string },
    });

    const isEmployer = user?.role === "employer";

    if (isEmployer) {
      const alljobs = await ctx.prisma.job.findMany({
        where: {
          userId: ctx.currentUser,
        },
        include: {
          user: {
            select: {
              name: true,
              locationId: true,
            },
          },
        },
      });
      return alljobs;
    }

    const myJobs = await ctx.prisma.job.findMany({
      include: {
        user: true,
      },
    });
    return myJobs;
  }),

  create: privateProcedure
    .input(createJobSchema)
    .mutation(async ({ ctx, input }) => {
      const { positions, salary, position, description } = input;

      console.log(input);
      const { success } = await rateLimit.limit(String(ctx.currentUser));

      if (!success) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
        });
      }

      const createdJob = await ctx.prisma.job.create({
        data: {
          position,
          positions,
          salary,
          description,
          user: { connect: { userId: ctx.currentUser } },
        },
      });

      return createdJob.id;
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

  delete: privateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input: { id } }) => {
      await ctx.prisma.job.delete({
        where: { id },
      });
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
