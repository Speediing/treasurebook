import { auth } from 'auth/lucia';

// import { refreshToken } from 'auth/shopify';
import * as context from 'next/headers';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const authRequest = auth.handleRequest('GET', context);
  const session = await authRequest.validate();

  if (session?.expires_at < new Date().getTime()) {
    console.log('expired');
    try {
      await refreshToken(session);
    } catch (error) {
      console.log(error);
    }
  }
}
export async function refreshToken(session: any) {
  const clientId = process.env.SHOPIFY_CLIENT_ID || '';

  const body = new URLSearchParams();

  body.append('grant_type', 'refresh_token');
  body.append('refresh_token', session.refresh_token);
  body.append('client_id', clientId);
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;
  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${clientSecret}`
  };

  const response = await fetch(
    `https://shopify.com/${process.env.SHOPIFY_SHOP_ID}/auth/oauth/token`,
    {
      method: 'POST',
      headers,
      body: body
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Response(text, {
      status: response.status,
      headers: {
        'Content-Type': 'text/html; charset=utf-8'
      }
    });
  }

  const { access_token, expires_in, id_token, refresh_token } = await response.json();

  const customerAccessToken = await exchangeAccessToken(access_token);
  const newsession = {
    customer_authorization_code_token: access_token,
    expires_at: new Date(new Date().getTime() + (expires_in - 120) * 1000).getTime(),
    id_token: id_token,
    refresh_token: refresh_token,
    customer_access_token: customerAccessToken
  };
  try {
    await auth.updateSessionAttributes(session.sessionId, newsession);
  } catch (e) {
    console.log(e);
    // if (e instanceof LuciaError && e.message === `AUTH_INVALID_SESSION_ID`) {
    //   // invalid user id
    // }
    // provided session attributes violates database rules (e.g. unique constraint)
    // or unexpected database errors
  }
  return session;
}

async function exchangeAccessToken(access_token: string) {
  const body = new URLSearchParams();
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;
  body.append('grant_type', 'urn:ietf:params:oauth:grant-type:token-exchange');
  body.append('client_id', process.env.SHOPIFY_CLIENT_ID || '');
  body.append('audience', '30243aa5-17c1-465a-8493-944bcc4e88aa');
  body.append('subject_token', access_token);
  body.append('subject_token_type', 'urn:ietf:params:oauth:token-type:access_token');
  body.append('scopes', 'https://api.customers.com/auth/customer.graphql');

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${clientSecret}`
  };

  // Token Endpoint goes here
  const response = await fetch(
    `https://shopify.com/${process.env.SHOPIFY_SHOP_ID}/auth/oauth/token`,
    {
      method: 'POST',
      headers,
      body
    }
  );

  //   interface AccessTokenResponse {
  //     access_token: string;
  //     expires_in: number;
  //     error?: string;
  //     error_description?: string;
  //   }

  const data = await response.json();
  if (data.error) {
    throw new Response(data.error_description, { status: 400 });
  }
  return data.access_token;
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};
