import 'server-only'

import { validateSessionToken } from "@/auth/session";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import { cache } from 'react';


export const getCurrentSession = cache(async (): Promise<string | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value ?? null;
  if (token === null) {
    return null;
  }
  const result = await validateSessionToken(token);

  return result;
});

export const verifySession = cache(async (): Promise<string | null> => {
  const result: string | null = await getCurrentSession();
  if (!result) {
    redirect('/login');
  }

  return result;
});

