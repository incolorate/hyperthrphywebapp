import Layout from "~/components/Layout";
import { api } from "~/utils/api";
import { useState, useEffect, SetStateAction } from "react";
import { Set } from "../../components/Set";
import { object } from "zod";

export default function NewWorkout() {
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<string[]>([]);

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
    console.log(selectedExercise);
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
      <div className="max-md flex flex-col gap-1">
        {showExerciseModal &&
          exerciseObjectArray?.map((object, index) => {
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
