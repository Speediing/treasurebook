// import type { PortableTextBlock } from '@portabletext/types';
// import clsx from 'clsx';

// import type { SanityModuleGrid } from '~/lib/sanity';
// import { useRootLoaderData } from '~/root';
// import SanityImage from '../media/SanityImage';
// import PortableText from '../portableText/PortableText';

// type Props = {
//   value: PortableTextBlock & SanityModuleGrid;
// };

// export default function GridBlock({ value }: Props) {
//   const { sanityDataset, sanityProjectID } = useRootLoaderData();

//   return (
//     <div
//       className={clsx(
//         'first:mt-0 last:mb-0', //
//         'my-8 grid grid-cols-1 gap-x-3',
//         'md:grid-cols-2'
//       )}
//     >
//       {value?.items?.map((item) => (
//         <div className="flex items-start gap-3 py-3 border-t border-t-gray" key={item._key}>
//           <div className="bg-lightGray relative flex aspect-square w-[5rem] shrink-0 items-center justify-center overflow-hidden rounded-sm">
//             {item.image && (
//               <SanityImage
//                 alt={item.image?.altText}
//                 crop={item.image?.crop}
//                 dataset={sanityDataset}
//                 hotspot={item.image?.hotspot}
//                 layout="fill"
//                 objectFit="cover"
//                 projectId={sanityProjectID}
//                 sizes="25vw"
//                 src={item.image?.asset?._ref}
//               />
//             )}
//           </div>
//           <div className="space-y-1">
//             <div className="font-bold text-md">{item.title}</div>
//             <PortableText className="text-sm" blocks={item.body} />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
