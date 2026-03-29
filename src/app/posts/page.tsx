import Link from 'next/link';
import db from '@/db/drizzle';
import { postsTable } from '@/db/schema';

export default async function Posts() {
  const posts = await db
    .select({ id: postsTable.id, title: postsTable.title })
    .from(postsTable);

  // await new Promise(resolve => setTimeout(resolve, 1000));

  return (
    <>
      <h1 className="text-3xl text-center mb-10 font-bold">Posts</h1>
      {posts.map(post => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <div className='my-5 bg-zinc-900 w-[50%] mx-auto p-4 rounded-xl'>
            <h2 className='text-2xl'>{post.title}</h2>
          </div>
        </Link>
      ))}
    </>
  );
}
