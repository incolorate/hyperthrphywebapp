import Layout from "~/components/Layout";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Exercise } from "~/components/Exercise";

export default function EditWorkout() {
  const router = useRouter();
  const { id } = router.query;
  const numberId = Number(id);

  const workoutInfo = api.exercises.findSpecificWorkout.useQuery({
    id: numberId,
  });

  return (
    <Layout>
      <Exercise />
    </Layout>
  );
}
