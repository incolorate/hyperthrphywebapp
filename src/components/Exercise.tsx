import { useState } from "react";
import { number, string } from "zod";

interface FormData {
  weight: number;
  reps: number;
}

export function Exercise({ setNumber }) {
  const [formData, setFormData] = useState<FormData>({ weight: 0, reps: 0 });

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
    </tr>
  );
}
