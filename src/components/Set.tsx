import { useState } from "react";
import { Exercise } from "./Exercise";

interface CardInformation {
  exerciseName: any;
}

export function Set({ exerciseName }: CardInformation) {
  const [setNumber, setSetNumber] = useState([]);

  const onAdd = () => {
    setSetNumber((prev) => [...prev, prev.length]);
  };

  return (
    <div>
      <p className="text-2xl">{exerciseName}</p>
      <table className="max-md w-full text-center">
        <thead>
          <tr>
            <th>SET</th>
            <th>PREVIOUS</th>
            <th>KG</th>
            <th>REPS</th>
          </tr>
        </thead>
        <tbody>
          {setNumber.map((set) => {
            return <Exercise key={set} setNumber={set} />;
          })}
        </tbody>
      </table>
      <div className="max-md flex w-full justify-center">
        <button className="text-blue-400" onClick={onAdd}>
          Add set
        </button>
      </div>
    </div>
  );
}
