"use server";

import db from "@/db/drizzle";
import { postsTable } from "@/db/schema";

export async function createPost(formData: FormData) {
  const title = formData.get("title");
  const content = formData.get("content");

  if (!title) {
    return;
  }

  await db
    .insert(postsTable)
    .values({ title: String(title), content: String(content) })
}