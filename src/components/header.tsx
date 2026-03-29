import { logout } from "@/actions/logout";
import Navbar from "./navbar";
import { getCurrentUsername } from "@/auth/session";
import Link from "next/link";

export default async function Header() {
  const username = await getCurrentUsername();

  return (
    <header className="flex items-center p-8 justify-between text-2xl bg-zinc-900">
      <Navbar />
      <ul className="flex items-center gap-10 justify-start">
        {username
          ? (
            <>
              <li>{username ?? 'Not signed in'}</li>
              <li>
                <button onClick={logout} className="bg-zinc-800 border border-zinc-500 py-1 px-2 rounded-md cursor-pointer">Log out</button>
              </li>
            </>
          ) : (
            <>
              <li><Link className="bg-zinc-800 border border-zinc-500 py-2 px-4 rounded-md cursor-pointer" href="/register">Register</Link></li>
              <li><Link className="bg-zinc-800 border border-zinc-500 py-2 px-4 rounded-md cursor-pointer" href="/login">Log in</Link></li>
            </>
          )}
      </ul>
    </header>
  )
}