import Layout from "~/components/Layout";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import { Exercise } from "../../components/Exercise";

export default function NewWorkout() {
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<string[]>([]);
  const [currentWorkout, setCurrentWorkout] = useState<object[]>([]);

  const { data: latestWorkout } = api.exercises.findLatest.useQuery();

  const handleModal = () => {
    setShowExerciseModal((prev) => !prev);
  };

  // Get the list of exercises from db
  const { data: exerciseObjectArray } = api.exercises.getAll.useQuery();

  //Highlight the selected exercises
  const highLightExercise = (exerciseName: string) => {
    if (selectedExercise.includes(exerciseName)) {
      setSelectedExercise((prev: string[]) =>
        prev.filter((name) => name != exerciseName)
      );
    } else {
      setSelectedExercise((prev: string[]) => [...prev, exerciseName]);
    }
  };

  // Push selected exercises to currentWorkout exerciseObjectArray
  const handleAddExercises = () => {
    {
      exerciseObjectArray?.map((object) => {
        return selectedExercise.map((exercise) =>
          exercise === object.name
            ? setCurrentWorkout((prev: object[]) => [...prev, object])
            : ""
        );
      });
    }
    handleModal();
    setSelectedExercise([]);
  };

  return (
    <Layout>
      <div>
        {showExerciseModal ? (
          <p className="text-xl">Chose exercises</p>
        ) : (
          <p>Current workout</p>
        )}
      </div>
      {showExerciseModal || (
        <div>
          {currentWorkout.map((exerciseObject, index) => {
            return (
              <div key={index}>
                <Exercise
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  name={exerciseObject?.name}
                  id={exerciseObject?.id}
                  description={exerciseObject.description}
                  workoutId={latestWorkout?.id}
                />
              </div>
            );
          })}
        </div>
      )}
      <div className="max-md flex flex-col gap-1">
        {showExerciseModal && (
          <div>
            {exerciseObjectArray?.map((object, index) => {
              return (
                <div
                  key={index}
                  onClick={() => highLightExercise(object.name)}
                  className={
                    selectedExercise.includes(object.name)
                      ? "text-blue-400"
                      : "text-black"
                  }
                >
                  <p>{object.name}</p>
                  <p className="text-xs">{object.description}</p>
                </div>
              );
            })}
            <div className="mt-2 flex flex-col justify-center gap-2">
              <button className="text-blue-400" onClick={handleAddExercises}>
                Add exercises
              </button>
              <button className="text-red-500" onClick={handleModal}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {showExerciseModal || (
        <div className="text-center">
          <button onClick={handleModal} className="text-blue-400">
            ADD EXERCISE
          </button>
        </div>
      )}
    </Layout>
  );
}
