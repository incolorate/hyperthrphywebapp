import { useState } from "react";
import { api } from "~/utils/api";
import { Set } from "./Set";

interface CardInformation {
  name: string;
  id: string;
  description: string;
  workoutId: number;
  exerciseInfo: object[];
}

export function Exercise({
  name,
  id,
  description,
  workoutId,
  exerciseInfo,
}: CardInformation) {
  return (
    <div>
      <p className="text-2xl">{name}</p>
      <table className="max-md w-full text-center">
        <thead>
          <tr>
            <th>SET</th>
            <th>PREVIOUS</th>
            <th>KG</th>
            <th>REPS</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {exerciseInfo.map((set, index) => (
            <Set
              key={set.id}
              previousRepetitions={set.repetitions}
              previousWeight={set.weight}
              setNumber={index}
              workoutId={set.workoutId}
              exerciseId={set.exerciseId}
              setId={set.id}
            />
          ))}
        </tbody>
      </table>
      <div className="max-md flex w-full justify-center">
        <button className="text-blue-400">Add set</button>
      </div>
    </div>
  );
}
