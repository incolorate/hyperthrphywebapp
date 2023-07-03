import Layout from "~/components/Layout";
import { api } from "~/utils/api";
import { useState } from "react";
import { Set } from "../../components/Set";

export default function NewWorkout() {
  const [showExercises, setShowExercises] = useState(false);
  const [clicked, setClicked] = useState([]);
  const [currentWorkout, setCurrentWorkout] = useState([]);
  // Get exercise list
  const { data } = api.exercises.getAll.useQuery();

  const showModal = () => {
    setShowExercises((prev) => !prev);
    setClicked([]);
  };

  // Create an array of selected exercises
  const selectExercise = (exerciseName) => {
    if (clicked.includes(exerciseName)) {
      setClicked((prev) => prev.filter((name) => name !== exerciseName));
    } else {
      setClicked((prev) => [...prev, exerciseName]);
    }
  };

  // Handle save
  const onSave = () => {
    setCurrentWorkout((prev) => [...prev, ...clicked]);
    setShowExercises((prev) => !prev);
  };

  console.log(currentWorkout);

  return (
    <Layout>
      {showExercises || (
        <>
          <div>
            <p className="p-2">Current workout</p>
            {currentWorkout.map((exercise) => {
              return (
                <div className="p-2">
                  <Set exerciseName={exercise} key={exercise} />;
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="flex flex-col gap-2 p-2">
        {showExercises &&
          data?.map((exercise) => (
            <div
              key={exercise.id}
              className={
                clicked.includes(exercise.name) ? "bg-blue-400" : "bg-zinc-300"
              }
              onClick={() => selectExercise(exercise.name)}
            >
              {exercise.name}
            </div>
          ))}
        {showExercises && (
          <div className="flex justify-center gap-2 p-2">
            <button className="rounded-md bg-green-200 p-2" onClick={onSave}>
              Add exercises
            </button>
            <button onClick={showModal} className="rounded-md bg-red-500 p-2">
              Close
            </button>
          </div>
        )}
      </div>
      <div className="max-md flex justify-center">
        {showExercises || (
          <button onClick={showModal} className="rounded-md bg-yellow-500 p-2">
            Add exercises
          </button>
        )}
      </div>
    </Layout>
  );
}
