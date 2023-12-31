import { number, z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs/server";
import { Input } from "postcss";

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
      include: {
        workouts: {
          include: {
            sets: {
              include: {
                exercise: true,
              },
            },
          },
        },
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
  findLatest: publicProcedure.query(({ ctx }) => {
    const userId = ctx.userId || undefined;
    return ctx.prisma.workout.findFirst({
      orderBy: {
        id: "desc",
      },
      where: {
        userId,
      },
    });
  }),
  createSet: publicProcedure
    .input(
      z.object({
        workoutId: z.number(),
        exerciseId: z.string(),
        weight: z.number(),
        repetitions: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      const set = ctx.prisma.set.create({
        data: {
          workout: { connect: { id: input.workoutId } },
          exercise: { connect: { id: input.exerciseId } },
          weight: input.weight,
          repetitions: input.repetitions,
        },
      });
      return set;
    }),
  getWorkouts: publicProcedure.query(({ ctx }) => {
    const userId = ctx.userId || undefined;
    const getWorkouts = ctx.prisma.workout.findMany({
      where: {
        userId,
      },
    });
    return getWorkouts;
  }),
  findSpecificWorkout: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      const workoutInfo = ctx.prisma.workout.findUnique({
        where: {
          id: input.id,
        },
        include: {
          sets: {
            include: {
              exercise: true,
            },
          },
        },
      });
      return workoutInfo;
    }),
  editSet: publicProcedure
    .input(
      z.object({
        id: z.number(),
        newWeight: z.number(),
        newRepetitions: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updateSet = await ctx.prisma.set.update({
        where: {
          id: input.id,
        },
        data: {
          weight: input.newWeight,
          repetitions: input.newRepetitions,
        },
      });
      return updateSet;
    }),
});
