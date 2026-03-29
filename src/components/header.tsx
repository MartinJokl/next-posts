import Link from "next/link";


export default function Header() {
  return (
    <header>
      <ul className="flex items-center gap-10 p-8 justify-start text-2xl bg-zinc-900">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/posts">Posts</Link>
        </li>
        <li>
          <Link href="/create">Create</Link>
        </li>
      </ul>
    </header>
  )
}