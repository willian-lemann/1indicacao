import superjson from "superjson";

import { appRouter } from "@/server/api/root";
import { createServerSideHelpers } from "@trpc/react-query/server";

import { prisma } from "@/server/db";

// export const apiSSG = createServerSideHelpers({
//   router: appRouter,
//   ctx: { prisma },
//   transformer: superjson,
// });
