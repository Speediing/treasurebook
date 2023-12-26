import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import LogoSquare from 'components/logo-square';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { getNavItemsSanity } from '../../../sanity/lib/queries/layout';
import MobileMenu from './mobile-menu';

import Search from './search';

export default async function Navbar() {
  const { navOptions, logoUrl } = await getNavItemsSanity();

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      {/* <div className="flex flex-row justify-between w-full md:hidden">
        <MobileMenu menu={navOptions} />
        <Link href={'/'} className="flex h-[44px] flex-col justify-center">
          <Image src={logoUrl} width={140} height={27.5} alt={''} />
        </Link>
        <div className="">
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div> */}
      <div className="l flex w-full flex-row items-center justify-between">
        <div className="hidden w-full md:flex md:w-1/3">
          <Link href="/" className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
            <LogoSquare logoUrl={logoUrl} />
          </Link>
        </div>
        <div className={'flex md:hidden'}>
          <MobileMenu menu={navOptions} />
        </div>
        <div className="hi hidden flex-row justify-center gap-6 md:flex md:w-1/3">
          {navOptions.map((item: any) => (
            <div key={item.title}>
              <Link
                href={item.path}
                className="text-xs uppercase tracking-widest text-black underline-offset-4 hover:text-black hover:underline"
              >
                {item.title}
              </Link>
            </div>
          ))}
        </div>
        <Link href={'/'} className="flex h-[44px] flex-col justify-center md:hidden">
          <Image src={logoUrl} width={140} height={27.5} alt={''} />
        </Link>
        <div className="flex justify-end gap-4 md:w-1/3">
          <div className={'hidden md:flex'}>
            <Suspense fallback={<OpenCart />}>
              <Search />
            </Suspense>
          </div>
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
