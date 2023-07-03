import Layout from "../components/Layout";
import Link from "next/link";

export default function Workout() {
  return (
    <Layout>
      <div>
        <p className="font-mono text-4xl">Workout</p>
        <div className="flex justify-center p-4">
          <Link href={`/workout/newworkout`}>
            <button className="w-80 rounded-md bg-blue-500 p-2 text-yellow-50 ">
              Start new workout
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
