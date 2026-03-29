"use server";

import { createSession } from '@/auth/session';
import db from '@/db/drizzle';
import { userTable } from '@/db/schema'
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function register(formData: FormData) {
  const username = String(formData.get("username"));
  const password = String(formData.get("password"));
  const password2 = String(formData.get("password2"));

  if (!username || !password || !password2) {
    return;
  }
  if (password !== password2) {
    return;
  }

  const salt: string = await bcrypt.genSalt(10);
  const passwordHash: string = await bcrypt.hash(password, salt);

  await db
    .insert(userTable)
    .values({ username, password: passwordHash });

  const token = await createSession(username);

  const enviroment = process.env.NODE_ENV || 'development';
  const inProd = enviroment === 'production';

  (await cookies()).set({
    name: 'token',
    value: token,
    httpOnly: inProd,
    secure: inProd,
    sameSite: 'lax'
  });

  redirect('/');
}