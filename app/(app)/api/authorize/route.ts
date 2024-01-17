import { authenticateShopifyCode } from 'auth/shopify';
import { NextRequest } from 'next/server';
export const runtime = 'edge';
export async function GET(request: NextRequest) {
  const code = new URL(request.url).searchParams.get('code');
  const state = new URL(request.url).searchParams.get('state');

  return await authenticateShopifyCode(code || '', state || '');
}
