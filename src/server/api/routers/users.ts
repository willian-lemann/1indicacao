import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";

export const usersRouter = createTRPCRouter({
  create: privateProcedure
    .input(z.object({ role: z.string(), name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const userCreated = await ctx.prisma.user.create({
        data: {
          role: input.role,
          name: input.name,
          userId: ctx.currentUser,
        },
      });

      return userCreated;
    }),

  update: privateProcedure
    .input(
      z.object({
        name: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      console.log(input);
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
    const user = await ctx.prisma.user.findUnique({
      where: { userId: ctx.currentUser },
    });

    return user;
  }),
});
