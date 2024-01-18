import { PageBuilder } from 'components/pagebuilder/pagebuilder';
import type { Metadata } from 'next';

export const revalidate = 43200; // 12 hours in seconds

export async function generateMetadata({}: { params: { page: string } }): Promise<Metadata> {
  return {
    title: '',
    description: ''
  };
}
// export const runtime = 'edge';
export default async function Page({ params }: { params: { page: string } }) {
  return (
    <div className="min-h-screen bg-white">
      <PageBuilder slug={params.page} />
    </div>
  );
}
