import Link from 'next/link';
import db from '@/db/drizzle';
import { postsTable } from '@/db/schema';

export default async function Posts() {
  const posts = await db
    .select({
      id: postsTable.id,
      title: postsTable.title,
      creator: postsTable.creatorUsername,
      createdAt: postsTable.createdAt
    })
    .from(postsTable)
    .orderBy(postsTable.createdAt);

  return (
    <>
      <h1 className="text-3xl text-center mb-10 font-bold mt-5">Posts</h1>
      {posts.map(post => (
        <Link className='relative my-5 bg-zinc-900 w-[50%] mx-auto p-4 rounded-xl h-30 hover:bg-zinc-800 transition-colors' key={post.id} href={`/posts/${post.id}`}>
          <h2 className='text-2xl text-center'>{post.title}</h2>
          <p className='absolute top-3 right-3 text-zinc-400'>{post.creator}</p>
          <p className='absolute bottom-3 right-3 text-zinc-400'>{post.createdAt.toLocaleDateString()}</p>
        </Link>
      ))}
      {posts.length === 0 && (
        <p className='text-center text-zinc-400'>Nothing found</p>
      )}
    </>
  );
}
