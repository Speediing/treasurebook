import { PageBuilder } from 'components/pagebuilder/pagebuilder';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};
export const runtime = 'edge';
export default async function HomePage() {
  return <PageBuilder slug={'home'} />;
}
