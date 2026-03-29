"use server";

import { createSession } from '@/auth/session';
import db from '@/db/drizzle';
import { userTable } from '@/db/schema'
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'

export async function login(formData: FormData): Promise<string> {
  const username = String(formData.get("username"));
  const password = String(formData.get("password"));

  if (!username || !password) {
    return "You have to pass in a username and password";
  }

  const queryResult = await db
    .select({ password: userTable.password })
    .from(userTable)
    .where(eq(userTable.username, username));

  if (queryResult.length !== 1) {
    return "Username does not exist";
  }
  const realPasswordHash = queryResult[0].password;

  const valid = await bcrypt.compare(password, realPasswordHash);
  if (!valid) {
    return "Username or password is wrong";
  }

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