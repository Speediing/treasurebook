import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import LogoSquare from 'components/logo-square';
import Link from 'next/link';
import { Suspense } from 'react';
import { client } from '../../../sanity/lib/client';
import { urlForImage } from '../../../sanity/lib/image';

import Search from './search';
const { SITE_NAME } = process.env;

export default async function Navbar() {
  const nav = await client.fetch(`*[_type == "headerNavigation"]`);
  const navData = nav[0];
  const logoUrl = urlForImage(navData.logo.asset._ref).url();
  const navOptions = navData.napOptions.map((x: any) => {
    return { title: x.name, path: x.path.current };
  });
  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      {/* <div className="flex-none block md:hidden">
        <MobileMenu menu={menu} />
      </div> */}
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link href="/" className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
            <LogoSquare logoUrl={logoUrl} />
          </Link>
          {/* {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline "
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null} */}
        </div>
        <div className="flex flex-row justify-center gap-6 md:flex md:w-1/3">
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
        <div className="flex justify-end gap-4 md:w-1/3">
          <Search />
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
