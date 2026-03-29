"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();

  return (
    <ul className="flex items-center gap-10 justify-start">
      <li>
        <Link className={path === '/' ? 'underline' : ''} href="/">Home</Link>
      </li>
      <li>
        <Link className={path === '/posts' ? 'underline' : ''} href="/posts">Posts</Link>
      </li>
      <li>
        <Link className={path === '/create' ? 'underline' : ''} href="/create">Create</Link>
      </li>
      <li>

      </li>
    </ul>
  )
}