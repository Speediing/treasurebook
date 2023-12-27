import { urlForImage } from '../../sanity/lib/image';
import { getPageBuilder } from '../../sanity/lib/queries/pagebuilder';
import { Biography } from './biography';
import { FullWidthImage } from './full-width-image';
import { SplitSmallText } from './split-small-text';

export const PageBuilder = async ({ slug }: { slug: string }) => {
  const pageContent = await getPageBuilder(slug);
  return (
    <>
      {pageContent.map((x: any) => {
        console.log(x);
        switch (x._type) {
          case 'fullWidthImage':
            return <FullWidthImage imageUrl={urlForImage(x.image.asset._ref)} />;
          case 'splitSmallText':
            return <SplitSmallText leftOptions={x.leftItems} rightOptions={x.rightItems} />;
          case 'Biography':
            return (
              <Biography body={x.body} title={x.title} imageUrl={urlForImage(x.image.asset._ref)} />
            );
          default:
            break;
        }
      })}
    </>
  );
};
