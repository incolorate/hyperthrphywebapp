import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs/server";

export const exercisesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const exercises = await ctx.prisma.exercise.findMany();
    return exercises;
  }),
  getUserWorkout: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId || undefined;
    return await ctx.prisma.user.findUnique({
      where: {
        userId,
      },
    });
  }),
  createWorkout: publicProcedure.mutation(({ ctx }) => {
    const userId = ctx.userId || undefined;
    const date = new Date();
    const workout = ctx.prisma.workout.create({
      data: {
        notes: "Enter notes",
        date,
        duration: 0,
        user: { connect: { userId } },
      },
    });
    return workout;
  }),
});
