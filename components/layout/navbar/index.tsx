import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import LogoSquare from 'components/logo-square';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { getNavItemsSanity } from '../../../sanity/lib/queries/layout';
import MobileMenu from './mobile-menu';

import { getAccountDetails } from 'app/(app)/account/details/data';
import { startShopifyAuth } from 'auth/shopify';
import clsx from 'clsx';
import Search from './search';

export default async function Navbar() {
  const { navOptions, logoUrl } = await getNavItemsSanity();
  const account = await getAccountDetails();

  return (
    <nav className="relative flex items-center justify-between px-4 py-4 lg:px-6">
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
          <Suspense>
            <MobileMenu
              menu={
                account?.emailAddress
                  ? [...navOptions, { title: 'Account', path: '/account/details' }]
                  : [...navOptions, { title: 'Login', path: '/account/details' }]
              }
            />
          </Suspense>
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
          <div className="relative hidden h-11 w-11 items-center justify-center rounded-none border text-black transition-colors  md:flex md:h-[38px] md:w-[120px] ">
            <div className="flex flex-row transition-all ">
              <div className="flex flex-col justify-center">
                <svg
                  className={clsx('h-4 ease-in-out hover:scale-110 ')}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="pr-2 text-sm uppercase text-gray-600">
                {account?.emailAddress ? (
                  <Link href={'/account/details'}>
                    {account?.firstName ? `${account?.firstName}` : 'ACCOUNT'}
                  </Link>
                ) : (
                  <form action={startShopifyAuth}>
                    <button type="submit">LOGIN</button>
                  </form>
                )}
              </div>
            </div>
          </div>

          <Suspense>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
