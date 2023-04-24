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
      z.object({ role: z.string(), name: z.string(), locationId: z.string() })
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
    console.log("ctxxxxxxxxxx", ctx.currentUser);
    const user = await ctx.prisma.user.findUnique({
      where: { userId: ctx.currentUser },
    });

    return user;
  }),

  getAllCandidates: privateProcedure.query(async ({ ctx }) => {
    const candidates = await ctx.prisma.user.findMany({
      where: { role: "candidate" },
    });

    return candidates;
  }),
});
