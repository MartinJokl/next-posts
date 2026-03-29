import db from '../../db/drizzle';

export default async function Posts() {
  const posts = await db.query.postsTable.findMany();

  // await new Promise(resolve => setTimeout(resolve, 1000));

  return (
    <div className="m-5">
      <h1 className="text-3xl font-bold mb-4">Post</h1>
      <p className="text-zinc-400">yes</p>
      {posts.map(post => (
        <div className='my-5 bg-zinc-900 w-[50%] mx-auto p-4 rounded-xl' key={post.id}>
          <h2 className='text-2xl'>{post.title}</h2>
          <p className='text-zinc-400'>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
