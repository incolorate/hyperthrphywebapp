import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Layout({ children }: any) {
  const user = useUser();
  const router = useRouter();
  const inactive = "text-xl ";
  const active = inactive + "text-yellow-600";

  if (!user.isSignedIn) {
    return <div>Not logged in</div>;
  }

  return (
    <>
      <div className="mb-16 p-2">{children}</div>
      <nav className="fixed inset-x-0 bottom-0 z-10  block bg-white shadow">
        <div className="flex justify-between">
          <button>
            <Link
              href="/profile"
              className={
                router.pathname.includes("profile") ? active : inactive
              }
            >
              Profile
            </Link>
          </button>

          <Link
            href="/history"
            className={router.pathname.includes("history") ? active : inactive}
          >
            History
          </Link>
          <Link
            href="/workout"
            className={router.pathname.includes("workout") ? active : inactive}
          >
            Workout
          </Link>
          <Link
            href="/measure"
            className={router.pathname.includes("measure") ? active : inactive}
          >
            Measure
          </Link>
        </div>
      </nav>
    </>
  );
}
