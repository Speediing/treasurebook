import Footer from 'components/layout/footer';
import Image from 'next/image';
import { Suspense } from 'react';
import { client } from '../sanity/lib/client';
import { urlForImage } from '../sanity/lib/image';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

const FullWidthImage = ({ imageUrl }: { imageUrl: string }) => {
  if (imageUrl.length > 1) {
    return <Image alt="" src={imageUrl} height="500" width={'1000'} className={'w-full'} />;
  } else {
    return <div></div>;
  }
};

const SplitSmallText = ({
  leftOptions,
  rightOptions
}: {
  leftOptions: string[];
  rightOptions: string[];
}) => {
  return (
    <div className="flex w-full flex-row justify-between px-16 pt-28 text-xs">
      <div className="flex flex-col">
        {leftOptions.map((x) => (
          <div key={x}>{x}</div>
        ))}
      </div>
      <div className="flex flex-col">
        {' '}
        {rightOptions.map((x) => (
          <div key={x}>{x}</div>
        ))}
      </div>
    </div>
  );
};

export default async function HomePage() {
  const content = await client.fetch(`*[_type == "page" && slug.current == "/"]`);
  const pageContent = content[0].pageBuilder;
  return (
    <>
      {pageContent.map((x: any) => {
        console.log(x);
        switch (x._type) {
          case 'fullWidthImage':
            return <FullWidthImage imageUrl={urlForImage(x.image.asset._ref).url()} />;
          case 'splitSmallText':
            return <SplitSmallText leftOptions={x.leftItems} rightOptions={x.rightItems} />;
          default:
            break;
        }
      })}

      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
