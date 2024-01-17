import { lucia } from 'lucia';
import { nextjs_future } from 'lucia/middleware';
import 'lucia/polyfill/node';

import { pg } from '@lucia-auth/adapter-postgresql';
import { upstash } from '@lucia-auth/adapter-session-redis';
import { kv } from '@vercel/kv';
import { db } from '@vercel/postgres';
export const auth = lucia({
  adapter: {
    user: pg(db, {
      user: 'auth_user',
      key: 'user_key',
      session: null // will be stored in redis
    }),
    session: upstash(kv)
  },
  getSessionAttributes: (session) => {
    return { ...session };
  },
  env: process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD',
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false
  },
  getUserAttributes: () => {
    return {};
  }
});

export type Auth = typeof auth;
