import db from '@/db/drizzle'
import { sessionsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

const sessionLifetime = 60 * 60 * 24 * 10;

function generateRandomString(): string {
  const charOptions = 'abcdefghijklmnopqrstuvwxyz123456' // 32 jich je

  // chcem 120 bitu entropy, pouzijem 5 z kazdyho 5 * 24 = 120
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);

  let result: string = ''
  for (const byte of bytes) {
    result += charOptions[byte >> 3]
  }
  return result;
}

async function hashSecret(secret: string): Promise<string> {
  const secretBytes = new TextEncoder().encode(secret);
  const secretHashBuffer = await crypto.subtle.digest("SHA-256", secretBytes);
  const hashedBytes = new Uint8Array(secretHashBuffer);
  return hashedBytes.toString();
}

export async function createSession(username: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  const id = generateRandomString();
  const secret = generateRandomString();
  const secretHash = await hashSecret(secret);

  await db
    .insert(sessionsTable)
    .values({ id, secretHash, createdAt: now, userUsername: username });

  const token = `${id}.${secret}`;
  return token;
}

export async function validateSessionToken(token: string): Promise<string | null> {
  const now = Math.floor(Date.now() / 1000);

  const splitToken = token.split('.');
  if (splitToken.length !== 2) {
    return null;
  }
  const [id, secret] = splitToken;
  const sessionQueryResult = await db
    .select()
    .from(sessionsTable)
    .where(eq(sessionsTable.id, id));
  // console.log(sessionQueryResult);
  if (sessionQueryResult.length !== 1) {
    return null;
  }
  const session = sessionQueryResult[0];

  if (now - session.createdAt >= sessionLifetime) {
    await db
      .delete(sessionsTable)
      .where(eq(sessionsTable.id, id));
    return null;
  }

  const valid: boolean = (await hashSecret(secret)) === session.secretHash;
  if (!valid) {
    return null;
  }

  return session.userUsername;
}