import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Layout({ children }: any) {
  const user = useUser();
  const router = useRouter();
  const inactive = "text-xl ";
  const active = inactive + "text-stone-50";

  if (!user.isSignedIn) {
    return <div>Not logged in</div>;
  }

  return (
    <>
      <div className="mb-16 p-2">{children}</div>
      <nav className="fixed inset-x-0 bottom-0 z-10   rounded-t-sm bg-stone-900 text-stone-400 shadow-md shadow-stone-600">
        <div className="flex justify-between p-2">
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
