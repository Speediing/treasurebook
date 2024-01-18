import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { getAccountDetails } from 'app/(app)/account/details/data';
import { startShopifyAuth } from 'auth/shopify';
import clsx from 'clsx';
import Cart from 'components/cart';
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
          <Suspense
            fallback={
              <button
                aria-label="Open mobile menu"
                className="flex h-11 w-11 items-center justify-center rounded-none text-black transition-colors dark:text-white md:hidden"
              >
                <Bars3Icon className="h-4" />
              </button>
            }
          >
            <MobileAuthButton />
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
            <Suspense
              fallback={
                <div className="relative  md:w-[250px] ">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search for products..."
                    autoComplete="off"
                    className="w-full rounded-none border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
                  />
                  <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
                    <MagnifyingGlassIcon className="h-4" />
                  </div>
                </div>
              }
            >
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
              <Suspense
                fallback={
                  <p className="hidden animate-pulse pr-2 text-sm uppercase text-gray-600 md:flex">
                    Loading
                  </p>
                }
              >
                <DesktopAuthButton />
              </Suspense>
            </div>
          </div>

          <Suspense
            fallback={
              <div className="relative flex h-11 w-11 items-center justify-center rounded-none text-black transition-colors md:h-[38px]  md:w-[38px] md:border ">
                <ShoppingCartIcon
                  className={clsx('h-4 transition-all ease-in-out hover:scale-110 ')}
                />
              </div>
            }
          >
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
const DesktopAuthButton = async () => {
  const account = await getAccountDetails();
  return (
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
  );
};

const MobileAuthButton = async () => {
  const { navOptions } = await getNavItemsSanity();
  const account = await getAccountDetails();
  return (
    <MobileMenu
      menu={
        account?.emailAddress
          ? [...navOptions, { title: 'Account', path: '/account/details' }]
          : [...navOptions, { title: 'Login', path: '/account/details' }]
      }
    />
  );
};
