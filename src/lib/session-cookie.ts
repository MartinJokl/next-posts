import 'server-only'
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export default async function setSessionCookie(session: string, cookieHeader: ReadonlyRequestCookies) {
  const inProd = process.env.NODE_ENV === 'production';

  cookieHeader.set({
    name: 'session',
    value: session,
    httpOnly: inProd,
    secure: inProd,
    sameSite: 'lax'
  });
}