import { createTRPCRouter } from "@/server/api/trpc";

import { usersRouter } from "./routers/users";
import { jobsRouter } from "./routers/jobs";
import { prisma } from "../db";
import { getAuth } from "@clerk/nextjs/server";
import { locationsRouter } from "./routers/locations";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  users: usersRouter,
  jobs: jobsRouter,
  locations: locationsRouter,
});

export type AppRouter = typeof appRouter;

export const getSSRAppRouter = (context: any) => {
  const { req } = context;

  const { userId } = getAuth(req);

  const app = appRouter.createCaller({
    prisma,
    currentUser: userId,
  });

  return app;
};
