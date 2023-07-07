import Layout from "~/components/Layout";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Exercise } from "~/components/Exercise";
import { useState, useEffect } from "react";

export default function EditWorkout() {
  const router = useRouter();
  const { id } = router.query;
  const numberId = Number(id);
  const {
    data: workoutInfo,
    isLoading,
    isError,
  } = api.exercises.findSpecificWorkout.useQuery({
    id: numberId,
  });

  const [exercises, setExercises] = useState<string[]>([]);
  const setInfo = workoutInfo?.sets;
  useEffect(() => {
    const uniqueExercises: string[] = [];
    setInfo?.map((set) => {
      if (uniqueExercises.includes(set.exercise.name)) {
        // do nothing
      } else {
        // push exercise name to array
        uniqueExercises.push(set.exercise.name);
      }
      setExercises(uniqueExercises);
    });
  }, [setInfo]);

  if (isLoading) {
    return <p>Loading...</p>; // Render a loading state while the data is being fetched
  }

  if (isError) {
    return <p>Error occurred while loading workout data</p>; // Render an error state if there is an error during the request
  }

  return (
    <Layout>
      {exercises.map((exerciseName, index) => {
        const exerciseInfo = setInfo?.filter(
          (exercise) => exercise.exercise.name === exerciseName
        );
        console.log(exerciseInfo);
        return <Exercise key={index} exerciseInfo={exerciseInfo} />;
      })}
    </Layout>
  );
}
