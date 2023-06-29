import Layout from "~/components/Layout";
import { api } from "~/utils/api";
import { useState } from "react";

export default function NewWorkout() {
  const [showExercises, setShowExercises] = useState(false);

  // Get exercise list
  const { data } = api.exercises.getAll.useQuery();

  const showModal = () => {
    setShowExercises((prev) => !prev);
  };

  return (
    <Layout>
      {showExercises || (
        <button onClick={showModal} className="rounded-md bg-yellow-500 p-2">
          Add exercises
        </button>
      )}
      <div>Current workout:</div>

      <div>
        {showExercises &&
          data?.map((exercise) => (
            <div
              key={exercise.id}
              className="mt-1 w-full bg-zinc-200"
              onClick={() => console.log(exercise)}
            >
              {exercise.name}
            </div>
          ))}
        {showExercises && (
          <div className="flex justify-center gap-2 p-2">
            <button>Add exercises</button>
            <button onClick={showModal}>Close</button>
          </div>
        )}
      </div>
    </Layout>
  );
}
