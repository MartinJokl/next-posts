import { verifySession } from "@/lib/dal";
import { createPost } from "@/actions/create-post";

export default async function Page() {
  const username: string | null = await verifySession();
  if (!username) {
    return (
      <h1 className="text-3xl text-center mb-10 font-bold mt-5">Log in to create a post</h1>
    )
  }

  return (
    <>
      <h1 className="text-3xl text-center mb-10 font-bold mt-5">Create a post</h1>
      <form action={createPost} className="w-175 max-w-full mx-auto text-center">
        <input
          className="mb-3 w-full border border-zinc-600 bg-zinc-900 rounded-md p-1 text-xl"
          name="title"
          type="text"
          required
          placeholder="Title..." />
        <textarea
          className="mb-3 w-full border border-zinc-600 bg-zinc-900 rounded-md p-1 text-xl h-30 resize-none"
          name="content"
          required
          placeholder="Content..." />
        <button
          className="text-xl bg-zinc-900 py-2 px-6 border border-zinc-600 cursor-pointer rounded-md hover:bg-zinc-800"
          type="submit"
        >Post</button>
      </form>
    </>
  )
}