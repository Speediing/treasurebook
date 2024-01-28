import { urlForImage } from '../../sanity/lib/image';
import { getPageBuilder } from '../../sanity/lib/queries/pagebuilder';
import { Biography } from './biography';
import { FullWidthImage } from './full-width-image';
import { SplitSmallText } from './split-small-text';
import { VideoHero } from './videoHero';

export const PageBuilder = async ({ slug }: { slug: string }) => {
  const pageContent = await getPageBuilder(slug);
  return (
    <>
      {pageContent.map((x: any) => {
        switch (x._type) {
          case 'fullWidthImage':
            return <FullWidthImage imageUrl={urlForImage(x.image.asset._ref)} />;
          case 'splitSmallText':
            return <SplitSmallText leftOptions={x.leftItems} rightOptions={x.rightItems} />;
          case 'Biography':
            return (
              <Biography body={x.body} title={x.title} imageUrl={urlForImage(x.image.asset._ref)} />
            );
          case 'Video Header':
            return <VideoHero module={x} />;
          default:
            break;
        }
      })}
    </>
  );
};
