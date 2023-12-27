'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { createUrl } from 'lib/utils';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const imageSearchParam = searchParams.get('image');
  const imageIndex = imageSearchParam ? parseInt(imageSearchParam) : 0;

  const nextSearchParams = new URLSearchParams(searchParams.toString());
  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  nextSearchParams.set('image', nextImageIndex.toString());
  const nextUrl = createUrl(pathname, nextSearchParams);

  const previousSearchParams = new URLSearchParams(searchParams.toString());
  const previousImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1;
  previousSearchParams.set('image', previousImageIndex.toString());
  const previousUrl = createUrl(pathname, previousSearchParams);

  const buttonClassName =
    'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center';
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  console.log(count);
  console.log(current);
  return (
    <>
      <div className="hidden h-fit w-full flex-col justify-start gap-4 lg:flex">
        {images.map((x) => {
          return (
            <div key={x.src} className="flex flex-row justify-center">
              <Image
                className=" w-full max-w-[550px] object-contain"
                width={550}
                height={550}
                sizes="(min-width: 1024px) 66vw, 100vw"
                alt={x.altText as string}
                src={x.src as string}
                priority={true}
              />
            </div>
          );
        })}
      </div>
      <div className="flex flex-col lg:hidden">
        <div className="flex flex-row justify-center">
          <Carousel
            setApi={setApi}
            className="flex aspect-square w-full max-w-xs justify-center lg:hidden"
          >
            <CarouselContent className="">
              {images.map((x) => {
                return (
                  <CarouselItem key={x.src}>
                    <div className="p-1 py-2">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-0">
                          <Image
                            className=" w-full max-w-[550px] object-contain"
                            width={550}
                            height={550}
                            sizes="(min-width: 1024px) 66vw, 100vw"
                            alt={x.altText as string}
                            src={x.src as string}
                            priority={true}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="flex h-1 w-full flex-row justify-between gap-2 bg-white px-1">
          {images.map((x, i) => {
            return (
              <div
                className={`w-full ${current - 1 === i ? 'bg-black' : 'bg-white'}`}
                key={x.src}
              ></div>
            );
          })}
        </div>
      </div>
    </>
    // <Carousel>
    //   {images.length > 1 ? (
    //     <CarouselContent className="flex items-center justify-center gap-2 py-1 my-12 overflow-auto lg:mb-0">
    //       {images.map((image, index) => {
    //         const isActive = index === imageIndex;
    //         const imageSearchParams = new URLSearchParams(searchParams.toString());

    //         imageSearchParams.set('image', index.toString());

    //         return (
    //           <CarouselItem key={image.src}>
    //             <li className="w-20 h-20">
    //               <Link
    //                 aria-label="Enlarge product image"
    //                 href={createUrl(pathname, imageSearchParams)}
    //                 scroll={false}
    //                 className="w-full h-full"
    //               >
    //                 <GridTileImage
    //                   alt={image.altText}
    //                   src={image.src}
    //                   width={80}
    //                   height={80}
    //                   active={isActive}
    //                 />
    //               </Link>
    //             </li>
    //           </CarouselItem>
    //         );
    //       })}
    //     </CarouselContent>
    //   ) : null}

    //   <CarouselPrevious />
    //   <CarouselNext />
    // </Carousel>

    // <>
    //   <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
    //     {images[imageIndex] && (
    //       <Image
    //         className="object-contain w-full h-full"
    //         fill
    //         sizes="(min-width: 1024px) 66vw, 100vw"
    //         alt={images[imageIndex]?.altText as string}
    //         src={images[imageIndex]?.src as string}
    //         priority={true}
    //       />
    //     )}
    //     {/* {images.map((x) => {
    //       return (
    //         <Image
    //           className="object-contain w-full h-full"
    //           fill
    //           sizes="(min-width: 1024px) 66vw, 100vw"
    //           alt={images[imageIndex]?.altText as string}
    //           src={images[imageIndex]?.src as string}
    //           priority={true}
    //         />
    //       );
    //     })} */}
    //     {images.length > 1 ? (
    //       <div className="absolute bottom-[15%] flex w-full justify-center">
    //         <div className="flex items-center mx-auto border border-white rounded-full h-11 bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80">
    //           <Link
    //             aria-label="Previous product image"
    //             href={previousUrl}
    //             className={buttonClassName}
    //             scroll={false}
    //           >
    //             <ArrowLeftIcon className="h-5" />
    //           </Link>
    //           <div className="w-px h-6 mx-1 bg-neutral-500"></div>
    //           <Link
    //             aria-label="Next product image"
    //             href={nextUrl}
    //             className={buttonClassName}
    //             scroll={false}
    //           >
    //             <ArrowRightIcon className="h-5" />
    //           </Link>
    //         </div>
    //       </div>
    //     ) : null}
    //   </div>

    //   {images.length > 1 ? (
    //     <ul className="flex items-center justify-center gap-2 py-1 my-12 overflow-auto lg:mb-0">
    //       {images.map((image, index) => {
    //         const isActive = index === imageIndex;
    //         const imageSearchParams = new URLSearchParams(searchParams.toString());

    //         imageSearchParams.set('image', index.toString());

    //         return (
    //           <li key={image.src} className="w-20 h-20">
    //             <Link
    //               aria-label="Enlarge product image"
    //               href={createUrl(pathname, imageSearchParams)}
    //               scroll={false}
    //               className="w-full h-full"
    //             >
    //               <GridTileImage
    //                 alt={image.altText}
    //                 src={image.src}
    //                 width={80}
    //                 height={80}
    //                 active={isActive}
    //               />
    //             </Link>
    //           </li>
    //         );
    //       })}
    //     </ul>
    //   ) : null}
    // </>
  );
}
