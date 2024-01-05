'use server';
import { auth } from 'auth/lucia';
import { getCustomer } from 'lib/shopify';
import * as context from 'next/headers';
import { cookies, headers } from 'next/headers';
import { RedirectType, redirect } from 'next/navigation';
import { getPageSession } from './session';
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
async function generateState(): Promise<string> {
  const timestamp = Date.now().toString();
  const randomString = Math.random().toString(36).substring(2);
  return timestamp + randomString;
}

async function generateNonce(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let nonce = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    nonce += characters.charAt(randomIndex);
  }

  return nonce;
}

export async function startShopifyAuth() {
  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const state = await generateState();
  const nonce = await generateNonce(5);
  const authorizationRequestUrl = new URL(
    `https://shopify.com/${process.env.SHOPIFY_SHOP_ID}/auth/oauth/authorize`
  );

  authorizationRequestUrl.searchParams.append(
    'scope',
    'openid email https://api.customers.com/auth/customer.graphql'
  );
  const headersList = headers();
  const domain = `https://${headersList.get('host')}`;

  authorizationRequestUrl.searchParams.append('client_id', clientId || '');
  authorizationRequestUrl.searchParams.append('response_type', 'code');
  authorizationRequestUrl.searchParams.append('redirect_uri', `${domain}/api/authorize` || '');

  authorizationRequestUrl.searchParams.append('state', state);
  authorizationRequestUrl.searchParams.append('nonce', nonce);
  context.cookies().set('shopify_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60
  });
  return redirect(authorizationRequestUrl.toString(), RedirectType.replace);
}

export async function logoutShopify() {
  const headersList = headers();
  const domain = `https://${headersList.get('host')}`;
  const { id_token, sessionId } = await getPageSession();

  const authorizationRequestUrl = new URL(
    `https://shopify.com/${process.env.SHOPIFY_SHOP_ID}/auth/logout?id_token_hint=${id_token}&post_logout_redirect_uri=${domain}`
  );
  authorizationRequestUrl.searchParams.append('id_token_hint', id_token);
  authorizationRequestUrl.searchParams.append('post_logout_redirect_uri', domain || '');
  await auth.invalidateSession(sessionId);
  // delete session cookie
  const authRequest = auth.handleRequest('GET', {
    cookies,
    headers
  });
  authRequest.setSession(null);
  return redirect(authorizationRequestUrl.toString(), RedirectType.replace);
}

export async function authenticateShopifyCode(code: string, state: string) {
  const headersList = headers();
  const domain = `https://${headersList.get('host')}`;
  const storedState = cookies().get('shopify_oauth_state')?.value;
  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;

  if (!code) throw new Response('No Code', { status: 400 });

  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400
    });
  }

  const origin = new URL(domain || ''); // In development this would resolve to the tunneled host or an Oxygen generated host.

  const body = new URLSearchParams();

  body.append('grant_type', 'authorization_code');
  body.append('client_id', clientId || '');
  body.append('redirect_uri', `${origin}api/authorize`);
  body.append('code', code);

  const userAgent =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36';

  const headersVal = {
    'content-type': 'application/x-www-form-urlencoded',
    'User-Agent': userAgent,
    Authorization: `Basic ${clientSecret}`
  };

  const tokenRequestUrl = `https://shopify.com/${process.env.SHOPIFY_SHOP_ID}/auth/oauth/token`; // Token endpoint

  const response = await fetch(tokenRequestUrl, {
    method: 'POST',
    headers: headersVal,
    body
  });

  //   interface AccessTokenResponse {
  //     access_token: string;
  //     expires_in: number;
  //     id_token: string;
  //     refresh_token: string;
  //   }

  if (!response.ok) {
    throw new Response(await response.text(), {
      status: response.status,
      headers: {
        'Content-Type': 'text/html; charset=utf-8'
      }
    });
  }

  const { access_token, expires_in, id_token, refresh_token } = await response.json();

  //   const nonce = getNonce(id_token);

  //   if (nonce != context.session.get('nonce'))
  //     throw new Response('Nonce does not match', { status: 400 });

  const accessToken = await exchangeAccessToken(access_token);

  let customer;
  try {
    customer = await getCustomer({ accessToken });
  } catch (error) {
    console.log(error);
  }

  let user;
  let createdUser = false;
  try {
    user = await auth.createUser({
      key: {
        providerId: 'shopify',
        providerUserId: customer.emailAddress,
        password: null
      },
      attributes: {}
    });
    createdUser = true;
  } catch (error) {
    user = await auth.getKey('shopify', customer.emailAddress);
    console.log(error);
  }

  const session = await auth.createSession({
    userId: user.userId,
    attributes: {
      customer_authorization_code_token: access_token,
      expires_at: new Date(new Date().getTime() + (expires_in - 120) * 1000).getTime(),
      id_token: id_token,
      refresh_token: refresh_token,
      accessToken: accessToken
    }
  });
  const authRequest = auth.handleRequest('GET', {
    cookies,
    headers
  });
  authRequest.setSession(session);
  if (createdUser) {
    return redirect('/account/details', RedirectType.replace);
  }
  return redirect('/', RedirectType.replace);
}
