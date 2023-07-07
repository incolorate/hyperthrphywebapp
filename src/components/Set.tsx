import { create } from "domain";
import { useState } from "react";

interface Props {
  setNumber: number;
  workoutId: number;
  exerciseId: string;
  previousRepetitions: number;
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
}: Props) {
  const [formData, setFormData] = useState<FormData>({
    weight: 0,
    reps: 0 || previousRepetitions,
  });
  const [checked, setChecked] = useState(false);

  const createSet = api.exercises.createSet.useMutation();

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
          />
        </label>
      </td>
      <td>
        <button onClick={handleCheck}>
          {checked ? (
            <BsCheckSquareFill className="text-blue-400" />
          ) : (
            <BsCheckSquare
              onClick={() =>
                createSet.mutate({
                  workoutId: workoutId,
                  exerciseId: exerciseId,
                  weight: Number(formData.weight),
                  repetitions: Number(formData.reps),
                })
              }
            />
          )}
        </button>
      </td>
    </tr>
  );
}
