import Link from "next/link";


export default function Header() {
  return (
    <header>
      <ul className="flex items-center gap-3 justify-between p-5 text-2xl">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/posts">Posts</Link>
        </li>
      </ul>
    </header>
  )
}