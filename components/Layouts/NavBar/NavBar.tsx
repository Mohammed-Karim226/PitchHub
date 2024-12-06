import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { PlusCircle, LogOut, LogIn, User } from "lucide-react"; // lucide-react icons

const NavBar = async () => {
  const session = await auth();

  return (
    <header className="px-6 sticky top-0 z-50 py-3 shadow-sm bg-white border-b border-gray-200">
      <nav className="flex justify-between items-center">
        {/* Logo and Brand Name */}
        <Link
          href="/"
          className="text-2xl flex items-center gap-2 font-bold text-yellow-600 hover:text-yellow-700 transition duration-150"
        >
          <Image src="/logo.png" alt="PitchHub logo" width={35} height={35} />
          PitchHub
        </Link>

        <div className="flex items-center gap-4">
          {/* Authenticated User Options */}
          {session && session?.user ? (
            <>
              <Link
                href="/startup/create"
                className="flex items-center gap-1 text-gray-500 text-lg hover:text-yellow-600 font-medium transition duration-150"
              >
                <PlusCircle className="w-5 h-5" />
                <span className="max-sm:hidden">Create</span>
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="flex items-center gap-1 text-gray-500 text-lg hover:text-yellow-600 font-medium transition duration-150"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="max-sm:hidden">Sign-Out</span>
                </button>
              </form>

              <Link
                href={`/user/${session?.user?.id}`}
                className="flex items-center gap-1 text-gray-500 text-lg hover:text-yellow-600 font-medium transition duration-150"
              >
                <User className="w-5 h-5" />
                <span className="max-sm:hidden">{session.user?.name}</span>
              </Link>
            </>
          ) : (
            /* Guest User Log-In Option */
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button
                type="submit"
                className="flex items-center gap-1 text-gray-700 hover:text-yellow-600 font-medium transition duration-150"
              >
                <LogIn className="w-5 h-5" />
                <span>Log-In</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
