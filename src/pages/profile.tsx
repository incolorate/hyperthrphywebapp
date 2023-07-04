import { useUser } from "@clerk/nextjs";
import Layout from "../components/Layout";
import Image from "next/image";
import { api } from "~/utils/api";

export default function Profile() {
  const { user } = useUser();
  const { data: userWorkout } = api.exercises.getWorkouts.useQuery();

  return (
    <Layout>
      <div>
        <p className="font-mono text-4xl">Profile</p>

        {user && (
          <div className="flex gap-2 align-middle">
            <Image
              src={user?.profileImageUrl}
              width={40}
              height={40}
              alt="profile image"
              className="rounded-full"
            />
            <div>
              <p>{user?.username}</p>
              <p className="text-xs">{userWorkout?.length} workouts</p>
            </div>
          </div>
        )}
        <div>
          <p>Dashboard</p>
        </div>
      </div>
    </Layout>
  );
}
