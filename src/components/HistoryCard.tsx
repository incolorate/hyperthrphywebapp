import { useState, useEffect } from "react";
import { set } from "zod";
import Link from "next/link";

interface Props {
  date: object;
  sets: object;
  workoutId: number;
}

export default function HistoryCard({ date, sets, workoutId }: Props) {
  const [count, setCount] = useState({});
  const [bestSet, setBestSet] = useState({});

  useEffect(() => {
    const exerciseCount = {};

    sets.forEach((set) => {
      if (exerciseCount[set.exercise.name]) {
        exerciseCount[set.exercise.name]++;
      } else {
        exerciseCount[set.exercise.name] = 1;
      }
    });
    const bestSetCount = {};
    sets.forEach((set) => {
      if (set.weight * set.repetitions > bestSetCount[set.exercise.name]) {
        bestSetCount[set.exercise.name] = set.weight * set.repetitions;
        console.log(set.weight);
      } else if (!bestSetCount[set.exercise.name]) {
        console.log(set.weight);
        bestSetCount[set.exercise.name] = set.weight * set.repetitions;
      }
    });
    setBestSet(bestSetCount);
    setCount(exerciseCount);
  }, []);

  return (
    <Link href={`history/${workoutId}`}>
      <div className="mb-2 cursor-pointer rounded-md border p-2 text-sm shadow-md">
        <div>
          <p>Workout name</p>
        </div>
        <div className="flex justify-between">
          <p>Exercise</p>
          <p>Best set</p>
        </div>
        <div>
          {Object.entries(count).map(([exercise, number]) => (
            <p key={exercise}>
              {number} X {exercise}
            </p>
          ))}
        </div>
      </div>
    </Link>
  );
}
