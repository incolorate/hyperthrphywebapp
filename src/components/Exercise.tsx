import { useState } from "react";
import { api } from "~/utils/api";
import { Set } from "./Set";

interface CardInformation {
  name: string;
  id: string;
  description: string;
}

export function Exercise({ name, id, description }: CardInformation) {
  const [setNumber, setSetNumber] = useState<number[]>([]);

  const onAdd = () => {
    setSetNumber((prev) => [...prev, prev.length]);
  };

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
          {setNumber.map((set) => {
            return <Set key={set} setNumber={set} />;
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
