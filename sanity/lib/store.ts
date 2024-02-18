// ./sanity/lib/store.ts

import * as queryStore from "@sanity/react-loader";

import { client } from "./client";
import { token } from "./token";

queryStore.setServerClient(client.withConfig({
  token, stega: {
    // Enable stega if it's a Vercel preview deployment, as the Vercel Toolbar has controls that shows overlays
    enabled: process.env.VERCEL_ENV === 'preview',
  },
}));

export const { loadQuery } = queryStore;
