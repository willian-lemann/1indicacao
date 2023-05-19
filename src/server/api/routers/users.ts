import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { rateLimit } from "@/utils/rate-limit";
import { TRPCError } from "@trpc/server";

const updateUserSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  position: z.string().optional(),
  instagram: z.string().optional(),
  phone: z.string().optional(),
});

export type UpdateUserSchemaData = z.infer<typeof updateUserSchema>;

export const usersRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        role: z.string(),
        name: z.string(),
        locationId: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { success } = await rateLimit.limit(String(ctx.currentUser));

      if (!success) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
        });
      }

      const userCreated = await ctx.prisma.user.create({
        data: {
          role: input.role,
          email: input.email,
          name: input.name,
          userId: ctx.currentUser,
          location: { connect: { id: input.locationId } },
        },
      });

      return userCreated;
    }),

  update: privateProcedure
    .input(updateUserSchema)
    .mutation(async ({ input, ctx }) => {
      const { success } = await rateLimit.limit(String(ctx.currentUser));

      if (!success) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
        });
      }

      const userCreated = await ctx.prisma.user.update({
        where: {
          userId: ctx.currentUser,
        },
        data: {
          ...input,
        },
      });

      return userCreated;
    }),

  byUserId: privateProcedure.query(async ({ ctx }) => {
    if (!ctx.currentUser) return;

    const user = await ctx.prisma.user.findUnique({
      where: { userId: ctx.currentUser },
      include: {
        location: true,
      },
    });

    return user;
  }),

  getAllCandidates: privateProcedure.query(async ({ ctx }) => {
    const candidates = await ctx.prisma.user.findMany({
      where: { role: "candidate" },
    });

    return candidates;
  }),

  getAllCompanies: privateProcedure.query(async ({ ctx }) => {
    const employers = await ctx.prisma.user.findMany({
      where: { role: "employer" },
    });

    return employers;
  }),
});
