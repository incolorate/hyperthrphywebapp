import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exercisesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    const exercises = ctx.prisma.exercise.findMany();
    return exercises;
  }),
});
