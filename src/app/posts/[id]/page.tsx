import db from "@/db/drizzle";
import { postsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";


export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id;
  const [post] = await db
    .select()
    .from(postsTable)
    .where(eq(postsTable.id, Number(id)));

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <h1 className="text-3xl text-center mb-10 font-bold">{post.title}</h1>
      <p className="text-zinc-400 text-center">{post.content}</p>
    </div>
  )
}