import { createTRPCRouter } from "@/server/api/trpc";

import { usersRouter } from "./routers/users";
import { jobsRouter } from "./routers/jobs";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  users: usersRouter,
  jobs: jobsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
