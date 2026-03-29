
export default async function Posts() {
  const response = await fetch("https://dummyjson.com/posts");

  const data: { id: number; title: string }[] = (await response.json()).posts;

  // await new Promise(resolve => setTimeout(resolve, 1000));

  return (
    <div className="m-5">
      <h1 className="text-3xl font-bold mb-4">Post</h1>
      <p className="text-zinc-400">yes</p>
      {data.map((post: { id: number; title: string }) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
        </div>
      ))}
    </div>
  );
}
