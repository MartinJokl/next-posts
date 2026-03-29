"use server";

import { getCurrentUsername } from "@/auth/session";
import db from "@/db/drizzle";
import { postsTable } from "@/db/schema";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData): Promise<void> {
  const username: string | null = await getCurrentUsername();
  if (!username) {
    return;
  }

  const title = formData.get("title");
  const content = formData.get("content");

  if (!title) {
    return;
  }

  await db
    .insert(postsTable)
    .values({ title: String(title), content: String(content), creatorUsername: username });

  redirect('/posts');
}