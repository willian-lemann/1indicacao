import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";

export const locationsRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const locations = await ctx.prisma.location.findMany();
    return locations;
  }),
});
