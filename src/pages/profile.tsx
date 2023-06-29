import { useUser } from "@clerk/nextjs";
import Layout from "../components/Layout";
import Image from "next/image";

export default function Profile() {
  const user = useUser();
  return (
    <Layout>
      <div>
        <p className="font-mono text-4xl">Profile</p>
        <div>
          <p>Welcome USERNAME</p>
        </div>
        <div>
          <p>Dashboard</p>
        </div>
      </div>
    </Layout>
  );
}
