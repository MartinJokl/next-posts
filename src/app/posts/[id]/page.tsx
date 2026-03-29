import db from "@/db/drizzle";
import { postsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";


export default async function PostPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id;
  const post = await db.query.postsTable.findFirst({
    where: eq(postsTable.id, Number(id))
  })

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <h1>{post?.title}</h1>
      <p>{post?.content}</p>
    </div>
  )
}