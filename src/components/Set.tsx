import { create } from "domain";
import { useState } from "react";

interface Props {
  setNumber: number;
  workoutId: number;
  exerciseId: string;
  previousRepetitions: number;
  previousWeight: number;
  setId: number;
}

interface FormData {
  weight: number;
  reps: number;
}
import { BsCheckSquareFill } from "react-icons/bs";
import { BsCheckSquare } from "react-icons/bs";
import { api } from "~/utils/api";

export function Set({
  setNumber,
  workoutId,
  exerciseId,
  previousRepetitions,
  previousWeight,
  setId,
}: Props) {
  const [formData, setFormData] = useState<FormData>({
    weight: previousWeight || 0,
    reps: previousRepetitions || 0,
  });

  const [checked, setChecked] = useState(false);

  // If we access the component from the historycard -> set to checked
  useState(() => {
    if (previousRepetitions && previousWeight) {
      setChecked(true);
    }
  });

  const createSet = api.exercises.createSet.useMutation();
  const updateSet = api.exercises.editSet.useMutation();

  const handleCheck = () => {
    setChecked((prev) => !prev);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <tr>
      <td>{setNumber + 1}</td>
      <td>12x12</td>
      <td>
        <label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            required
            className="w-16 rounded-md bg-zinc-200"
            disabled={checked ? true : false}
          />
        </label>
      </td>
      <td>
        <label>
          <input
            type="number"
            name="reps"
            value={formData.reps}
            onChange={handleInputChange}
            required
            className="w-16 rounded-md bg-zinc-200"
            disabled={checked ? true : false}
          />
        </label>
      </td>
      <td>
        <button onClick={handleCheck}>
          {checked ? (
            <BsCheckSquareFill className="text-blue-400" />
          ) : (
            <BsCheckSquare
              onClick={() => {
                if (previousRepetitions && previousWeight) {
                  updateSet.mutate({
                    id: setId,
                    newWeight: Number(formData.weight),
                    newRepetitions: Number(formData.reps),
                  });
                } else {
                  createSet.mutate({
                    workoutId: workoutId,
                    exerciseId: exerciseId,
                    weight: Number(formData.weight),
                    repetitions: Number(formData.reps),
                  });
                }
              }}
            />
          )}
        </button>
      </td>
    </tr>
  );
}
