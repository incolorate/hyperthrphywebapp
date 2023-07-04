import HistoryCard from "~/components/HistoryCard";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";

export default function History() {
  const { data: userWorkout } = api.exercises.getUserWorkout.useQuery();

  return (
    <Layout>
      <div>
        <div className="mb-2">
          <p className="text-4xl">History</p>
        </div>
        {userWorkout?.workouts.map((workout) => (
          <HistoryCard
            key={workout.id}
            date={workout.date}
            sets={workout.sets}
          />
        ))}
      </div>
    </Layout>
  );
}
